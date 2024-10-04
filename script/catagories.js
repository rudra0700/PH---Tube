// load catagories

const loadCategories = () => {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error(error));
};

const removeBtnClass = () =>{
  const buttons =  document.getElementsByClassName("category-btn");
 for(const button of buttons){
   button.classList.remove("active") 
 } 
}

// load categories wise video

const loadCategoriesWiseVideo =  (id) => {
   fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
   .then(response => response.json())
   .then(data =>
     {
      removeBtnClass()
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active")
      displayVideos(data.category)
     }
    )
   .catch(error => console.error(error)
   )
  
}

//display categories

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
       <button class="btn category-btn" onclick="loadCategoriesWiseVideo(${item.category_id})"  id="btn-${item.category_id}">${item.category}</button>
    `;
    categoryContainer.appendChild(buttonContainer);
  });
};

loadCategories();
