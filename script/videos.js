const loadVideos = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.error(error))
}


const getTimeString = (time) =>{
    // get hour and rest second
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    let minute = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60
    return `${hour} hour ${minute} minute ${remainingSeconds} second ago`;
    
}

const cardDemo = {
    
        "category_id": "1001",
        "video_id": "aaaa",
        "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
        "title": "Shape of You",
        "authors": [
            {
                "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
                "profile_name": "Olivia Mitchell",
                "verified": ""
            }
        ],
        "others": {
            "views": "100K",
            "posted_date": "16278"
        },
        "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
    
}

const loadDetails = async (videoId) =>{
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  
  displayDetails(data.video)
}

const displayDetails = (video) =>{
    // way-1 to see modal
    // document.getElementById("showModalData").click();

    // way-2 to see modal
    const detailsContainer = document.getElementById("modal-content");
    detailsContainer.innerHTML = `
    <img src="${video.thumbnail}" />
    <p>${video.description}</p>
    `;
    document.getElementById("customModal").showModal()
}
const displayVideos = (videos) =>{
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";

    if(videos.length === 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
           <div class="border-2 flex justify-center min-h-[300px] items-center flex-col gap-5">
               <img src="./assests/Icon.png" />
               <h2 class="text-center text-xl font-bold">No content here in this category</h2>
           </div>
        `;
        return;
    }else{
        videoContainer.classList.add("grid");
    }
 videos.forEach(video =>{
    // console.log(video);
    
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
     <figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}"
      alt="Shoes" class="h-full w-full object-cover" />
      ${video.others.posted_date?.length === 0 ? "" : ` <span class="absolute right-2 bottom-2 text-white text-xs bg-black p-1">${getTimeString(video.others.posted_date)}<span/>`}
     </figure>
    <div class="px-0 py-2 flex gap-4">
        <div>
          <img src="${video.authors[0].profile_picture}" class="w-10 h-10 object-cover rounded-full" />
        </div>
        <div>
            <h4 class="font-bold">${video.title}</h4>
            <div class="flex items-center gap-5">
               <p class="text-gray-500">${video.authors[0].profile_name}</p>
               ${video.authors[0].verified ? `<img src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"  class="w-5" />`: ""}   

               <div>
                 <p>
                 <button class="btn btn-error" onclick="loadDetails('${video.video_id}')">Details</button>
                 </p>
               </div>
            </div>
        </div>
    </div>
    `
   videoContainer.appendChild(card)
 })
  
}

loadVideos()
