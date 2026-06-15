document.addEventListener('DOMContentLoaded', function(){
  const openFilterBtn = document.querySelector('.open-filter');
  const closeFilterBtn = document.querySelector('.close-filter');
  const modalFilter = document.querySelector('.filter-block__form')

  if(closeFilterBtn && openFilterBtn && modalFilter){
    openFilterBtn.addEventListener('click', () =>{
      modalFilter.classList.add('active')
    })
    closeFilterBtn.addEventListener('click', () =>{
      modalFilter.classList.remove('active')
    })
  }
})