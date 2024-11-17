var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash-o");
// var Avg = thumbUp + thumbDown

Array.from(thumbUp).forEach(function(element) {
  element.addEventListener('click', function(){
    let thumbParent =  element.closest('li')
    const name =  thumbParent.querySelector('.name').innerText
    const location = thumbParent.querySelector('.locationT').innerText

    const thumbUp= parseFloat(thumbParent.querySelector('.thumbup').innerText)

    fetch('messages', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'location': location,
        'thumbup': thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    let thumbParent =  element.closest('li')
    const name =  thumbParent.querySelector('.name').innerText
    const location = thumbParent.querySelector('.locationT').innerText
    const thumbDown = parseFloat(thumbParent.querySelector('.thumbup').innerText)
    console.log(name)
    console.log(location)
    console.log(thumbDown)
    fetch('messages2', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'location': location,
        'thumbDown':thumbDown
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
          let thumbParent =  element.closest('li')
        const name =  thumbParent.querySelector('.name').innerText
        const location = thumbParent.querySelector('.locationT').innerText
    console.log(name,location)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'location': location
          
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
