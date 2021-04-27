
// Finite state automaton
//   state + event => new state + action
function FSA( matrix , initialState) {
  this.matrix = matrix;
  this.state = initialState;

                        p0 hit       p1 hit        p0 unhit          p1 unhit
  nothing selected      p0 selected  p1 selected
  p0 selected           NA           NA            nothing selected  NA
  p1 selected           NA           NA            NA                nothing selected

}
FSA.handle(event) {


}
