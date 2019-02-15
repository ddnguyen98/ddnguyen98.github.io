/*
 * Use AJAX to load the JSON and manipulate the HTML
 * https://jbonline.bitbucket.io/data/bikeshop.json
*/

let xhr = new XMLHttpRequest();

//Loading request
xhr.onload = function() {
    //Stores variables
    let responseObj = JSON.parse(xhr.responseText);

    if(document.URL.includes("index.html")){
        IndexJSON(responseObj)
    }
    else if(document.URL.includes("shop.html")){

    }
    else if(document.URL.includes("club_events.html")){

    }
    else if(document.URL.includes("blog.html")){

    }
};

//Json for html
function IndexJSON(response){
    let insertContent = '';
    let products = response.products;
    let benefits = response.benefits;

    //Checks length of products to be put on main page
    for (let i = 0; i < products.length; ++i){
        //Goes off of colors only contains one
        if(products[i].colors.length === 1){
            insertContent = '<img src="'+products[i].imageURL+'" alt="'+products[i].title+' that is in the color ${responseObj.products[i].color[0]}" width="100" height="100">';
        }
        else{
            let colorString = '';
            //Creates color string
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
            insertContent = '<img src="'+products[i].imageURL+'" alt="'+products[i].title+' that is available in the colors '+colorString+'" width="100" height="100">';
        }
        //Data
        insertContent += '<meter value="'+products[i].rating+'" min="0" max="5">'+products[i].rating+' out of 5 stars</meter>';
        insertContent += '<h3>'+products[i].title+'</h3>';
        insertContent += '<p>'+products[i].description+'</p>';
        //Will change if price has a sale included
        if(products[i].salePrice.length === 0){
            insertContent += '<p>$'+products[i].price+'</p>';
        }
        else{
            insertContent += '<p>$'+products[i].salePrice+' $<del>'+products[i].price+'</del></p>';
        }
        insertContent += '<button>Add to cart</button>';

        //Selects section of id fp and chooses article based on i
        let content = document.querySelector('section#fp article:nth-of-type('+(i+1)+')');
        content.innerHTML = insertContent;
    }

    //Checks length of benefits JSON
    for (let i = 0; i < benefits.length; ++i){
        insertContent = '<h3>'+benefits[i].title+'</h3>';
        insertContent += '<p>'+benefits[i].description+'</p>';
        //Adds form
        if(i === 2){
            insertContent +=
                '<form method="POST">' +
                '<p><label for="email">Email</label>' +
                '<input name="email" id="email" type="text"></p>' +
                '<input type="submit" value="Sign Up">' +
                '</form>'
        }
        //Changes html
        let content = document.querySelector('section#mb ul>li:nth-of-type('+(i+1)+')');
        content.innerHTML = insertContent;
    }
}
function ShopJSON(response){
    let insertContent = '';
    let products = response.products;
}
function ClubEventsJSON(response){
    let insertContent = '';
    let events = response.events;

}
function BlogJSON(response){
    let insertContent = '';
    let posts = response.posts;

}

//Gets data from jsonFile
xhr.open('GET', 'https://jbonline.bitbucket.io/data/bikeshop.json',true);
xhr.send(null);