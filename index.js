'use strict';

module.exports = ({
  types
}) => {

  function func_name(path) {
    let func_path = path.isReturnStatement() ? path.getFunctionParent() : path
    return func_path.node.id ? func_path.node.id.name : (func_path.node.key ? func_path.node.key.name : '<NO NAME>')
  }

  function filename(state) {
    if (state.file.opts.filename) {
      const filename_obj = state.file.opts.filename.match('[^/]*$')
      return filename_obj ? state.file.opts.filename.substr(filename_obj.index) : '<UNKNOWN>'
    }
    return '<UNKNOWN>'
  }

  function line_start(path) {
      return path.node.loc ? path.node.loc.start.line : '<UNKNOWN>'
  }
  function line_end(path) {
    return path.node.loc ? path.node.loc.end.line : '<UNKNOWN>'
  }
  function line_return(path) {
    return path.node.loc ? path.node.loc.start.line : '<UNKNOWN>'
  }

  function debug_call_expression(path, state, line, message) {
    let args = [types.stringLiteral('\x1b[33m%s\x1b[0m'),
                types.stringLiteral('[ DEBUG line: ' + line  + ' file: ' + filename(state) + ' function: ' + func_name(path) + ' ]'),
                types.stringLiteral(message.prefix)]
    if (message.params) {
      message.params.forEach((param, i) => {
        args.push(types.stringLiteral(param + ':'))
        args.push(types.Identifier(param))
      });
    }
    if (message.return) {
      args.push(types.stringLiteral('RETURN:'))
      args.push(message.return)
    }
    return types.expressionStatement(
             types.callExpression(
               types.identifier('console.log'), args))
  }

  function parameters(path) {
    let params = []
    path.node.params.forEach((param, i) => {
      // SIMPLE: f(x)
      if (types.isIdentifier(param)) params.push(param.name)
      else if (types.isAssignmentPattern(param)) {
        //DESTRUCTING: f({..} = {..})
        if (types.isObjectPattern(param.left)) {
          param.left.properties.forEach((prop, i) => {
            params.push(prop.key.name)
          });
        }
        //DEFAULT SIMPLE PARAMETER: f(x = ?)
        else if (types.isIdentifier(param.left)) params.push(param.left.name);
      }
    });
    return params;
  }

  function message_start(path, state) {
    if (!state.opts.use_parameters) return { prefix: 'ENTER' }
    let params = parameters(path)
    if (!params.length) return { prefix: 'ENTER' }
    return { prefix: 'ENTER', params: params };
  }
  function message_end(path, state) {
    if (!state.opts.use_parameters) return { prefix: 'EXIT' }
    let params = parameters(path)
    if (!params.length) return { prefix: 'EXIT' }
    return { prefix: 'EXIT', params: params };
  }
  function message_return(path, state) {
    if (!state.opts.use_parameters) return { prefix: 'EXIT' }
    return {
      prefix: 'EXIT',
      return: find_call_expressions(path) ?
              types.stringLiteral('<CONTAINS FUNCTION CALLS>') :
              path.node.argument
    };
  }
  function message_return_body(path, state) {
    if (!state.opts.use_parameters) return { prefix: 'EXIT' }
    return {
      prefix: 'EXIT',
      return: find_call_expressions(path.get('body.body.0.argument'))? // OBS: nothing in body except return statement allowed.
              types.stringLiteral('<CONTAINS FUNCTION CALLS>') :
              path.node.body.body[0].argument
    };
  }

  function find_call_expressions(path) {
    let found = false
    const visitor = {
      CallExpression() {
        found = true
      }
    };
    path.traverse(visitor)
    return found
  }

  function insert_start(path, state, message) {
    path.get('body').unshiftContainer('body', debug_call_expression(path, state, line_start(path), message));
  }

  function insert_end_return(path, state) {
    path.insertBefore(debug_call_expression(path, state, line_return(path), message_return(path, state)));
  }

  function insert_end(path, state, message) {
    path.get('body').pushContainer('body', debug_call_expression(path, state, line_end(path), message));
  }

  function insert_start_end(path, state) {
    insert_start(path, state, message_start(path, state))
    insert_end(path, state, message_end(path, state))
  }

  function insert_start_end_single_line(path, state) {
    insert_start(path, state, message_return_body(path, state)) // Ensure message_return_body is allways calculated first!
    insert_start(path, state, message_start(path, state))
  }

  return {
    pre(state) {
      this.started = false;
    },
    visitor: {
      ReturnStatement (path, state) {
        if (this.started) {
          insert_end_return(path, state)
          path.skip()
        }
      },
      ArrowFunctionExpression(path, state) {
        if (!path.get('body').isBlockStatement()) {
          path.arrowFunctionToExpression()
          if (this.started) {
            insert_start_end_single_line(path, state)
            path.skip()
          }
        } else if (this.started) {
          insert_start_end(path, state)
        }
      },
      "ClassMethod|FunctionDeclaration|FunctionExpression"(path, state) {
        if (this.started) insert_start_end(path, state)
      },
      Identifier(path, state) {
        if (path.node.name === '__DEBUG_START') {
          if (!state.opts.production) this.started = true
          path.parentPath.remove()
        } else if (path.node.name === '__DEBUG_END') {
          this.started = false
          path.parentPath.remove()
        }
      }
    }
  };
};
