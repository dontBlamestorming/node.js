var member = ['egoing', 'k8805', 'dave'];
console.log(member[1]); // k8805

// array loop
var i = 0;
while (i < member.length) {
    console.log(member[i]);
    i = i + 1;
}

var roles = {
    // 각각의 데이터마다 고유한 이름을 부여한다.
    // 배열보다 동적인(?) 정보를 저장할 수 있다. 
    // 보다 구체적인 정보를 저장할 수 있다. 
    'programmer' : 'egoing',
    'designer' : 'k8805',
    'manager' : 'dave'
}
console.log(roles.desinger); // k8805

// array object
for(var name in roles) {
    console.log('object key =>', name, 'value =>', roles[name]);
    // 변수 name은 객체의 key를, roles[name]은 객체의 value값을 갖는다. 이는 배열과 매무 비슷하다. 
}
