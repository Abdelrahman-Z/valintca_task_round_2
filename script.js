let products = [
  {
    productname: "Gold Coin",
    productprice: "112.55",
    productimage: "https://www.coinguide.com/wp-content/uploads/2019/09/1Ducat_front.png",
    addedtocart: false
  },
  {
    productname: "Silver Coin",
    productprice: "75.99",
    productimage: "https://www.royalmint.com/globalassets/bullion/_new_structure/coins/silver/ukbsb221c-obverse.png",
    addedtocart: false
  },
  {
    productname: "Diamond Ring",
    productprice: "1250.00",
    productimage: "https://cdn.shopify.com/s/files/1/0565/7916/2292/products/28_1500X2100.jpg?v=1644243834",
    addedtocart: false
  },
  {
    productname: "Platinum Watch",
    productprice: "750.00",
    productimage: "https://content.rolex.com/dam/2022/upright-bba/m228236-0012.png?impolicy=v6-upright",
    addedtocart: false
  },
  {
    productname: "Emerald Necklace",
    productprice: "850.00",
    productimage: "https://cdn.shopify.com/s/files/1/2703/7786/products/26301_500x500.progressive.jpg?v=1604670122",
    addedtocart: false
  },
  {
    productname: "Ruby Earrings",
    productprice: "500.00",
    productimage: "https://cdn.shopify.com/s/files/1/1696/0571/products/CE3829WRU__85116.1435276711.1280.1280_ee9bbdf1-70f4-469d-afa2-13a923420743_600x.jpg?v=1510684044",
    addedtocart: false
  }
];


if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(products));
}

// get the parent element
let parentElement = document.querySelector('.products .container');

// changing the objects to card 
let cards = JSON.parse(localStorage.getItem('products')).map(el => {
  let div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src=${el.productimage}/>
    <div class='content'>
      <h1 class='name'>${el.productname}</h1>
      <p class='price'>${el.productprice}</p>
    </div>
    <div class='buttons'>
      <button class="add" value=${el.addedtocart}>${el.addedtocart === true ? "remove from cart" : "add to chart"}</button>
      <button class="view">quick view</button>
    </div>
  `
  return div
})


// add the the card

cards.forEach(el => {
  parentElement.appendChild(el);
})


// get add to chart function
let addToChartButtons = document.querySelectorAll('.buttons > .add ')



// span that should have the added to cart arr length

let spanAddedCartLength = document.querySelector('.added_length')

// handle logic for reload on local storage

let onReloadData = JSON.parse(localStorage.getItem('products')).filter(el => {
  return el.addedtocart && el
})

if(onReloadData.length=== 0) spanAddedCartLength.classList.add('hidden')
else spanAddedCartLength.innerHTML = `${onReloadData.length}`


// get the added chart container
let addedToCartContainer = document.querySelector('.added')


// add elements on reload from local storage
let onReloadNodes = onReloadData.map(el => {
  let div = document.createElement('div');
  div.className = 'added_product';
  div.innerHTML = `
    <img src=${el.productimage}/>
    <p>${el.productname}</p>
  `
  return div
})

onReloadNodes.forEach(el => {
  addedToCartContainer.appendChild(el)
})


// get the local storage

let data = JSON.parse(localStorage.getItem('products'))

// change the value of elements
addToChartButtons.forEach((el , index)=> {
  el.addEventListener('click', () => {
    el.value = !JSON.parse(el.value)
    data[index].addedtocart = JSON.parse(el.value)
    localStorage.setItem('products' , JSON.stringify(data))
    if (JSON.parse(localStorage.getItem('products'))[index].addedtocart === true) el.textContent = `remove from cart`
    else el.textContent = 'add to chart'
    addAndRemove(JSON.parse(localStorage.getItem('products')))
  })
})

function addAndRemove(array) {
  spanAddedCartLength.classList.remove('hidden')
  addedToCartContainer.innerHTML = ``
  let addedArr = array.filter(el => {
    return el.addedtocart && el
  })
  let addNodes = addedArr.map(el => {
    let div = document.createElement('div');
    div.className = 'added_product';
    div.innerHTML = `
      <img src=${el.productimage}/>
      <p>${el.productname}</p>
    `
    return div
  }) 
  addNodes.forEach(el => {
    addedToCartContainer.appendChild(el)
  })
  spanAddedCartLength.innerHTML = addNodes.length
  if(spanAddedCartLength.textContent === '0') spanAddedCartLength.classList.add('hidden')
}

// show product when click on icon
let icon = document.querySelector('.cart-item > img');

icon.addEventListener('click', () => {
  addedToCartContainer.classList.toggle('show_product');
})

// handle the quick view logic
// get all view buttons

cards.forEach(el => {
  el.lastElementChild.lastElementChild.addEventListener('click', () => {
    let fixedDiv = document.createElement('div')
    fixedDiv.className = 'show-quick'
    fixedDiv.innerHTML = `
        <img src=${el.firstElementChild.src}/>
        <div class="content_fixed">
          <span class='name'>${el.children[1].firstElementChild.textContent}</span>
          <span class='price'>${el.children[1].lastElementChild.textContent}</span>
        </div>
    `
    document.body.appendChild(fixedDiv)
    let popUp = document.querySelector('.show-quick')
    
    popUp.addEventListener('click',  ()=> {
      popUp.remove()
    })
  })
})
