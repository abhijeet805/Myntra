let bagItemobjects;
const convineounsfee=99;

onload();
function onload(){
    loadbagItemObject();
    displaybagItem();
    displaybagSummury();
}

function loadbagItemObject(){

    bagItemobjects= bagItem.map(itemid=>{

       for(let i = 0 ; i < items.length;i++)
       {
            if(itemid == items[i].id){
                 return items[i];
            }
       }
    });
  console.log(bagItemobjects);
}

function displaybagItem()
{
    let bagcontainer=document.querySelector('.bag-items-container');
    let innerHTML='';
    bagItemobjects.forEach(bagItem=>{
            innerHTML+= generatebagItem(bagItem);
    });
    bagcontainer.innerHTML=innerHTML;
}

function removeFromBag(itemid){
     bagItem = bagItem.filter(bagitemid => bagitemid != itemid);
     localStorage.setItem('bag',JSON.stringify(bagItem));
    loadbagItemObject();
    displaybagItem();
    displaybagIcon();
    displaybagSummury();
}

function displaybagSummury(){
    getsummuryElement = document.querySelector('.bag-summary');
    totalItem=bagItemobjects.length;
    totalMRP=0;
    totalDiscount=0;
    finalPayment=0;

    bagItemobjects.forEach(itemobj=>{
      totalMRP += itemobj.current_price;
      totalDiscount +=  itemobj.original_price - itemobj.current_price;
      
    });
    finalPayment = totalMRP + convineounsfee; 
    
    getsummuryElement.innerHTML=` <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`
}

function generatebagItem(item){
      return `<div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="../${item.image}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">${item.return_period} days</span> return available
        </div>
        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
      </div>
  
      <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
    </div>`;
}