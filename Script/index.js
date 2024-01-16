let bagItem;
onload();

function onload(){
  let bagItemstr=localStorage.getItem('bag');
  bagItem=bagItemstr ? JSON.parse(bagItemstr) : [];
  additemonHomepage();
  displaybagIcon();

}

//added item id in the array
function addToBag(item){
   bagItem.push(item);
   localStorage.setItem('bag',JSON.stringify(bagItem));
   displaybagIcon();
}

function displaybagIcon(){  //bag counter
    let bagitemcountElement=document.querySelector(".bag-item-count");
    if(bagItem.length > 0){
        bagitemcountElement.style.visibility = 'visible';
        bagitemcountElement.innerHTML=bagItem.length;
    }
    else{
        bagitemcountElement.style.visibility = 'hidden';
    }
}


//Item added
function additemonHomepage(){
    let itemselector=document.querySelector('.items-container');
    let innerHTML=''; //Its a variable
    
    if(!itemselector)
       return;
    items.forEach(item=>{
    
        //concat all data within a variable 
        innerHTML += `<div class="item-container"> 
        <img src="${item.image}" alt="">
        <div class="rating">
               ⭐ | ${item.rating.count}
        </div>
        <div class="company-name">
          ${item.company}
        </div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        
        <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>`;
    });
    
    itemselector.innerHTML=innerHTML;
    
}