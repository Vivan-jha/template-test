const grid = document.getElementById('grid');
const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');
let ready = false;
let imagesLoaded =0;
let totalImages =0;
let photosArray = [];
//check if all images were loaded 
 function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
        console.log('ready=',ready);
    }
 }

//helper function to set attributes on dom elemetns
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]); 
    }
}

//Create elements for links and photos , add to dom
function displayPhotos(){
    
    totalImages = photosArray.length;
    console.log('total images',totalImages);
    //run function for each object  in photos array
    photosArray.forEach((photo)=>{
        //create <a> TO LINK TO unsplash 
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });
        //create image for photo 
        const img = document.createElement('img');
        
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //event listner,check when each is finished loading 
        img.addEventListener('load', imageLoaded);
        //put <img> inside <a>,then put both inside imagecontainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



const count = 30;
const accessKey = 'mMmwtG-m_rfErSHdwQ00IMN7EMez6jX3hGzwpu97XzE';
const apiEndpoint = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`

async function getPhotos() {
    const res = await fetch(apiEndpoint);
    photosArray = await res.json();
   displayPhotos();
    
}

//check to see if scrolling near bottom of page ,load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>= document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos();
    }
})

getPhotos();