/*
 * Use AJAX to load the JSON and manipulate the HTML
 * https://jbonline.bitbucket.io/data/bikeshop.json
*/

let xhr = new XMLHttpRequest();

//Loading request
xhr.onload = function() {
    //Stores variables
    let responseObj = JSON.parse(xhr.responseText);

    //populate id products
    if(document.querySelector("#featured")){
        let insertContent = '';
        let products = responseObj.products;

        insertContent += '<div class ="wrapper">';
        insertContent += '<h2>Shop <strong>Featured Products</strong></h2>';
        for (let i = 0; i < document.querySelectorAll("#featured article").length; ++i) {
            //Goes off of colors only contains one
            insertContent += '<article>';
            if(products[i].colors.length === 1){
                insertContent += '<img src="'+products[i].imageURL+'" alt="'+products[i].title+' that is in the color '+responseObj.products[i].colors[0]+'" width="100" height="100">';
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
                insertContent += '<img src="'+products[i].imageURL+'" alt="'+products[i].title+' that is available in the colors '+colorString+'" width="100" height="100">';
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
            insertContent += '</article>';
        }
        insertContent += '</div>';
        let productsContent = document.querySelector('#featured');
        productsContent.innerHTML = insertContent;
    }
    //populate id members
    if(document.querySelector('#members')){
        let insertContent = '';
        let benefits = responseObj.benefits;

        insertContent += '<h2>Cycle Club <strong>Member Benefits</strong></h2>';
        insertContent += '<ul>';
        for(let i = 0; i < document.querySelectorAll('#members li').length; ++i){
            insertContent += '<li>';
            insertContent += '<h3>'+benefits[i].title+'</h3>';
            insertContent += '<p>'+benefits[i].description+'</p>';

            //Adds form
            if(benefits[i].title === 'Newsletter') {
                insertContent += '<form method="POST">';
                insertContent += '<p><label for="email">Email</label>';
                insertContent += '<input name="email" id="email" type="text"></p>';
                insertContent += '<input type="submit" value="Sign Up">';
                insertContent += '</form>';
            }
            insertContent += '</li>';
        }
        insertContent += '</ul>';

        let membersContent = document.querySelector('#members');
        membersContent.innerHTML = insertContent;
    }
    //populate shop items
    if(document.querySelector('#products')){
        let insertContent = '';
        let products = responseObj.products;
        let itemMax = 9;
        if(products.length < 9){
            itemMax = products.length
        }
        for(let i = 0; i < itemMax; ++i){
            insertContent += '<article>';
            if(products[i].colors.length === 1){
                insertContent += '<img src="'+products[i].imageURL+'" alt="'+products[i].title+' that is in the color '+responseObj.products[i].colors[0]+'" width="100" height="100">';
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
                insertContent += '<img src="'+products[i].imageURL+'" alt="'+products[i].title+' that is available in the colors '+colorString+'" width="100" height="100">';
            }
            if(products[i].salePrice.length === 0){
                insertContent += '<p>$'+products[i].price+'</p>';
            }
            else{
                insertContent += '<p>$'+products[i].salePrice+' $<del>'+products[i].price+'</del></p>';
            }
            insertContent += '<h4>'+products[i].title+'</h4>';
            insertContent += '<button>Add To Cart</button>';
            insertContent += '<button>Like</button>';
            insertContent += '<button>Zoom in</button>';
            insertContent += '</article>';
        }
        let shopcontent = document.querySelector('#products');
        shopcontent.innerHTML = insertContent;
    }
    //populate club events
    if(document.querySelector('#events')){
        let insertContent = '';
        let events = responseObj.events;
        let itemMax = 9;
        if(events.length < 9) {
            itemMax = events.length
        }
        //Looks through event json
        for(let i = 0; i < itemMax; ++i){
            insertContent += '<article>';
            insertContent += '<div class="wrapper">';
            insertContent += '<p>'+events[i].date+'</p>';
            insertContent += '<h3>'+events[i].title+'</h3>';
            insertContent += '<p>Located at '+events[i].location+' '+events[i].text+'</p>';
            insertContent += '<a href="">RSVP here</a>';
            insertContent += '</div>';
            insertContent += '</article>';
        }
        //updates current html
        let contentEvents = document.querySelector('#events');
        contentEvents.innerHTML = insertContent;
    }
    //populate blog recent posts
    if(document.querySelector('#recentposts')){
        let insertContent = '';
        let posts = responseObj.posts;

        insertContent += '<ul>';
        //Recent posts (First two on JSON file)
        for (let i = 0; i < 2; ++i){
            insertContent += '<li>';
            insertContent += '<img src="'+posts[i].imageURL+'" alt="'+posts[i].title+'" width="100" height="100">';
            insertContent += '<h3><a href="">'+posts[i].title+'</a></h3>';
            insertContent += '</li>';
        }
        insertContent += '</ul>';
        let contentRecentPosts = document.querySelector('#recentposts');
        contentRecentPosts.innerHTML = insertContent;
    }
    //populates blog posts
    if(document.querySelector('#posts')){
        let insertContent = '';
        let posts = responseObj.posts;
        let itemMax = 9;
        if(posts.length < 9) {
            itemMax = posts.length
        }
        insertContent += '<div class="wrapper">';
        for (let i = 0; i < itemMax; ++i){
            insertContent += '<article>';
            insertContent += '<h3>'+posts[i].title+'</h3>';
            insertContent += '<img src="'+posts[i].imageURL+'" alt="'+posts[i].title+'" width="100" height="100">';
            insertContent += '<p>'+posts[i].postDate+'</p>';
            insertContent += '<p>'+posts[i].text+'</p>';
            insertContent += '<a href="">Read More</a>';
            insertContent += '</article>';
        }
        insertContent += '</div>';
        let contentPosts = document.querySelector('#posts');
        contentPosts.innerHTML = insertContent;
    }
};


//Gets data from jsonFile
xhr.open('GET', 'https://jbonline.bitbucket.io/data/bikeshop.json',true);
xhr.send(null);