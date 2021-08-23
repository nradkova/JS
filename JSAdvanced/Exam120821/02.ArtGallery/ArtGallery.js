class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = {
            picture: 200,
            photo: 50,
            item: 250
        }
        this.listOfArticles=[];
        this.guests=[];
    }

    addArticle( articleModel, articleName, quantity ){
        articleModel=articleModel.toLowerCase();
        if(!this.possibleArticles[articleModel]){
            throw new Error('This article model is not included in this gallery!');
        }
        const article={
            articleModel,
            articleName,
            quantity
        };
        const found=this.listOfArticles.find(x=>x.articleName==articleName&&x.articleModel==articleModel);
        if(found){
            found.quantity+=quantity;
        }else{
            this.listOfArticles.push(article);
        }
        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
    }

    inviteGuest ( guestName, personality){
        const found=this.guests.find(x=>x.guestName==guestName);
        if(found){
            throw new Error(`${guestName} has already been invited.`);
        }
        const guest={
            guestName,
            points:0,
            purchaseArticle: 0
        }
        const pointsTable={
            Vip:500,
            Middle:250
        }

        if(pointsTable[personality]){
            guest.points=pointsTable[personality];
        }else{
            guest.points=50;
        }
        this.guests.push(guest);
        return `You have successfully invited ${guestName}!`
    }

    buyArticle ( articleModel, articleName, guestName){
        articleModel=articleModel.toLowerCase();
        const foundArt=this.listOfArticles.find(x=>x.articleName==articleName&&x.articleModel==articleModel);
        if(!this.possibleArticles[articleModel]||!foundArt){
            throw new Error('This article is not found.');
        }
        if(foundArt.quantity==0){
            return `The ${articleName} is not available.`;
        }
        const foundGuest=this.guests.find(x=>x.guestName==guestName);
        if(!foundGuest){
            return 'This guest is not invited.';
        }
        const neededPoints=this.possibleArticles[articleModel];
        if(foundGuest.points<neededPoints){
            return `You need to more points to purchase the article.`;
        }else{
            foundGuest.points-=neededPoints;
            foundGuest.purchaseArticle+=1;
            foundArt.quantity-=1;
            return `${guestName} successfully purchased the article worth ${neededPoints} points.`
        }
    }

    showGalleryInfo (criteria){
        if(criteria=='article'){
            let message='Articles information:\n';
           const artStr= this.listOfArticles.map(x=>{
                return `${x.articleModel} - ${x.articleName} - ${x.quantity}`
            })
            .join('\n')
            return message+artStr;
        }
        if(criteria=='guest'){
            let message='Guests information:\n';
           const guestsStr= this.guests.map(x=>{
                return `${x.guestName} - ${x.purchaseArticle}`
            })
            .join('\n')
            return message+guestsStr;
        }
    }
}
