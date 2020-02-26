
var name = "dave";

var letter = "Dear " + name + "\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum " + name + " has been the industry's standard dummy text ever since the 1500s, when an unknown printer " + name + " took a galley of type and scrambled it to make a type specimen book.\nIt has survived not " + name + " only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets " + name + " containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

console.log(letter);


var letter = `Dear 

${name} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ${name} has been the industry's standard dummy text ever since the 1500s, when an unknown printer ${name} took a galley of type and scrambled it to make a type specimen book.

It has survived not ${name} only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 

It was popularised in the 1960s with the release of Letraset sheets ${name} containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

console.log(letter);