
const accessKey = "JLqxahqR4nesKF_i6u8tldw07yuG_VeTUxkU4de_QsI";
const inputBox = document.querySelector('input');
const searchBtn = document.querySelector('button');
const imagesContainer = document.querySelector('.image-container');
const loadMore = document.querySelector('#btn');
const text = document.querySelector('#text');

let imgpage = 1; 

const fetchImages = async (userSearch) => {
   try{
      const res = await fetch(`https://api.unsplash.com/search/photos?page=${imgpage}&per_page=20&query=${userSearch}&client_id=${accessKey}`)
      const data = await res.json()
      loadMore.innerHTML = "Show more"
      console.log(data);
      
      showImages(data.results);
   }
   catch(err){
      imagesContainer.innerHTML = `<h2>Server Error : ${err}</h2>`
   }
}

const showImages = (images) => {
   setTimeout(() => {
         images.forEach((image) => {
            imagesContainer.innerHTML += `
            <div class="images">
               <img src=${image.urls.small_s3} alt="" loading='lazy'>
               <div class='download-container'>
                 <a href=${image.links.html} target='__blank' download>Download</a>
               </div>
            </div> 
         `
         loadMore.innerHTML = 'Show more'
         })
   }, 1000);

   setTimeout(() => {
        loadMore.style.display = "block"
   }, 1010);
   

   
}

loadMore.addEventListener('click',() => {
   imgpage++
   fetchImages(inputBox.value,imgpage)
   setTimeout(() => {
      loadMore.innerHTML = 'Loading...'
   }, 100);
})


searchBtn.addEventListener('click',() => {
   if(!inputBox.value == ''){
      fetchImages(inputBox.value)
      imagesContainer.innerHTML = ''
   }
   else{
      alert('Please enter in this input box')
   }
})