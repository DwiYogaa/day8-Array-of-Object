const myEmail = "dwiyoga0023@gmail.com"

function getData() {
    let name = document.getElementById("input-name").value
    let email = document.getElementById('input-email').value
    let telp = document.getElementById('input-phone').value
    let subjectForm = document.getElementById('input-subject').value
    let message = document.getElementById('input-message').value
    
    // console.log(name)
    // console.log(email)
    // console.log(telp)
    // console.log(subjectForm)
    // console.log(message)

    let a = document.createElement('a')
    a.href = `mailto:${myEmail}?subject=${subjectForm}&body=Hello My Name ${name} ${message}, please call me at ${telp} you want to join in my project`
    a.click()
}