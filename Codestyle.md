# Naming
- variableNamesLikeThis
- functionNamesLikeThis
- functionArgumentsLikeThis
- ClassNamesLikeThis
- EnumNamesLikeThis
- methodNamesLikeThis
- CONSTANTS_LIKE_THIS
- namespacesLikeThis
# Variable declaration
Each variable should be declared:

- using a var statement;
- only once in the current scope;
- on a new line;
- as close as possible to the place where it's first used.
* Each var statement should have only one variable declared in it.

# Good:
```
var keys = ['foo', 'bar'];
var values = [23, 42];

var object = {};
while (items.length) {
var key = keys.pop();
object[key] = values.pop();
}
```
# Bad:
```
var keys = ['foo', 'bar'],
values = [23, 42],
object = {},
key;

while (items.length) {
key = keys.pop();
object[key] = values.pop();
}
```
# Block statements
The opening curly brace should be on the same line and separated with one space character:
```
if (test) {
// ...
}

function foo() {
// ...
}
Branching and looping statements should always be surrounded with curly braces:
```
# Good:
```
if (test) {
    return;
}
```
# Bad:
```
if (test)
    return;

if (test) return;

if (test) { return; }
```
