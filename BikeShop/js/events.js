/*
 * events.js
 * 
*/
let itemsShown = document.querySelector('#show');
let itemsFilter = document.querySelector('#sort');
itemsShown.addEventListener('change', ItemsPerPage);
itemsFilter.addEventListener('change', Filter);

//Changes items on page and changes total items being shown on page
function ItemsPerPage(event) {
    let target = event.target;
    let shop = target.parentElement.parentElement.parentElement.parentElement;
    let div = target.parentElement.parentElement;
    let items = div.querySelector("p");
    let content = shop.querySelector('#products');

    if (target.value === '9'){
        content.innerHTML = FillHTML(+target.value, false);
        items.innerHTML = content.children.length + " items";
    }
    else if (target.value === '6'){
        content.innerHTML = FillHTML(+target.value, false);
        items.innerHTML = content.children.length + " items";
    }
    else if (target.value === '3'){
        content.innerHTML = FillHTML(+target.value, false);
        items.innerHTML = content.children.length + " items";
    }
}
//Filters either normally or items on sale
function Filter(event){
    let target = event.target;
    let shop = target.parentElement.parentElement.parentElement;
    let form = target.parentElement.parentElement;
    let items = form.querySelector("div");
    let itemsP = items.querySelector("p");
    let content = shop.querySelector('#products');

    if(target.value === 'Sale'){
        content.innerHTML = FillHTML(9, true);
        itemsP.innerHTML = content.children.length + " items";
    }
    else{
        content.innerHTML = FillHTML(9 , false);
        itemsP.innerHTML = content.children.length + " items";
    }

}
function FillHTML(im, sale) {
    let insertContent = '';
    let responseObj = JSON.parse(xhr.responseText);
    let products = responseObj.products;

    let itemMax = im;
    if(products.length < itemMax){
        itemMax = products.length;
    }

    for(let i = 0; i < itemMax; ++i){
        if(sale){
            if(products[i].salePrice.length === 0){
                continue;
            }
        }
        insertContent += '<article>';
        if(products[i].colors.length === 1){
            insertContent += '<p class="thumbnail"><img src="'+products[i].imageURL+'" alt="'+products[i].title+' that is in the color '+responseObj.products[i].colors[0]+'" width="100" height="100"></p>';
        }
        else{
            let colorString = '';
            //Creates color string for img alt
            for (let e = 0; e < products[i].colors.length; ++e ){
                if(e === 0){
                    colorString+= products[i].colors[e];
                }
                else if(e !== products[i].colors.length - 1){
                    colorString+= ', '+products[i].colors[e];
                }
                else{
                    colorString+= ' or '+products[i].colors[e];
                }
            }
            //Other img if colors contains more than 1
            insertContent += '<p class="thumbnail"><img src="'+products[i].imageURL+'" alt="'+products[i].title+' that is available in the colors '+colorString+'" width="100" height="100"></p>';
        }
        if(products[i].salePrice.length === 0){
            insertContent += '<p>$'+products[i].price+'</p>';
        }
        else{
            insertContent += '<p>$'+products[i].salePrice+' <del>$'+products[i].price+'</del></p>';
        }
        insertContent += '<h4>'+products[i].title+'</h4>';
        insertContent += '<button>Add To Cart</button>';
        insertContent += '<button>Like</button>';
        insertContent += '<button>Zoom in</button>';
        insertContent += '</article>';
    }
    return insertContent;
}