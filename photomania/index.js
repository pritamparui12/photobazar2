let apikey = "340ZRbgsTaf9U4OiIoFqO7BN37wlz90pFeYcyRUHqQfSACevSGqggrU3"
const perPage = 15;
let currentPage = 1;
let searchdata= null;
let api = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
let search= document.querySelector(".search input");
let loadmore= document.querySelector(".loadmore")
let imgwrapper = document.querySelector(".lists")
let lightbox= document.querySelector(".lightroom")
let x= document.querySelector("#x")
let lightdownload= document.querySelector("#ld")




const getimgs = (imgs) => 
{
    let array = imgs.map(images => `
<li class="card" onclick="lightroom('${images.src.large2x}','${images.photographer}')">
<img src="${images.src.large2x}" alt="" srcset="">
<div class="details">
    <div class="photographer">
        <i class="fa-solid fa-camera-retro"></i>
            <span>${images.photographer}</span>
        </i>
    </div>
    <button onclick="downloadimg('${images.src.large2x}')"><i class="fa-solid fa-download"></i></button>
</div>
</li>`)
    let joinArray = array.join("");
    console.log(joinArray);
    imgwrapper.innerHTML += joinArray;
}
x.addEventListener("click",()=>{
    lightbox.classList.remove("show")
})
imgwrapper.addEventListener("mouseenter",()=>{
    pointer.style.opacity="0"
})

lightdownload.addEventListener("click",(e)=>downloadimg(e.target.dataset.img))

const lightroom=(img,name)=>{
     lightbox.querySelector("img").src=img
     lightbox.querySelector("span").innerText=name
     lightdownload.setAttribute("data-img",img);
    lightbox.classList.add("show")

}
const downloadimg=(url)=>{
    fetch(url).then(res=>res.blob()).then(file=>{
        let a= document.createElement("a");
        a.href= URL.createObjectURL(file)
        a.download= new Date().getTime()
        a.click();
    }).catch(()=>{alert("cannot download!")})
}


const loadimg= async (e)=>{

 
    currentPage++;
     api = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
     api= searchdata? `https://api.pexels.com/v1/search?query=${searchdata}&page=${currentPage}&per_page=${perPage}`:api
     await getimg(api)
     count=1

  
    currentPage++;
    api = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
    api= searchdata? `https://api.pexels.com/v1/search?query=${searchdata}&page=${currentPage}&per_page=${perPage}`:api
    await getimg(api)
 
}
loadmore.addEventListener("click",loadimg);

const find_img= async(e)=>{
    if(e.target.value ==="") return searchdata=null

    if (e.key==="Enter") {
        
        searchdata= e.target.value;
        console.log(searchdata);
        imgwrapper.innerHTML=""
        await getimg(`https://api.pexels.com/v1/search?query=${searchdata}&page=${currentPage}&per_page=${perPage}`)
    }
}
search.addEventListener("keyup",find_img);

const getimg = async (value) => {
    try {
        let response = await fetch(value, {
            headers: {
              Authorization: apikey,
            },
          });
        let data = await response.json();
        console.log(data);
        getimgs(data.photos)

    } catch (error) {
        console.log("error");
    }
}
let nav= document.querySelector(".navbar");
nav.addEventListener("mouseenter",()=>{
    pointer.style.opacity="0"  
})
getimg(api)
let pointer=document.querySelector(".pointer");
let banner= document.querySelector(".head_container");
banner.addEventListener("mousemove",(value)=>{
pointer.style.opacity="1"  
pointer.style.left=value.x+"px";
pointer.style.top=value.y+"px";
})
gsap.from("#head",{
    x:-50,
    opacity: 0,
    duration:2,
    yoyo:true,
   

})
gsap.from("p",{
    y:100,
    opacity: 0,
    duration:2,
   
    

})
