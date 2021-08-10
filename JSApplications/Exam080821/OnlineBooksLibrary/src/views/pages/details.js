import { html } from '../../../node_modules/lit-html/lit-html.js'
import { getOneById, delOne, postLike, getLikes, checkUserLiked } from '../../api/data.js';


const detailsTemplate = (book, isOwner, onDelete, onLike, canLike, likesCount) => html`  
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${isOwner 
                ? html`<a class="button" href="/edit/${book._id}">Edit</a>
                        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` 
                : ''}
            ${canLike
                ? html`<a @click=${onLike} id="likeBtn" class="button" href="javascript:void(0)">Like</a>`
                : ``}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likesCount}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export default async function detailsView(context) {
    const bookId = context.params.id;
    const user = context.user;
    const book = await getOneById(bookId);
    let likesCount = await getLikes(bookId);
    console.log(likesCount)
    let canLike=false;

    if(!user){
        return  context.render(detailsTemplate(book,false, onDelete, onLike, canLike, likesCount));
    }else if(user._id==book._ownerId){
        context.render(detailsTemplate(book,true, onDelete, onLike, canLike, likesCount));
    }else{
        canLike = await checkUserLiked(bookId, user._id);
        context.render(detailsTemplate(book,false, onDelete, onLike, canLike, likesCount));
    }
    
    async function onDelete(event) {
        event.preventDefault();
        const confirmed = confirm('Are you sure?');
        if (!confirmed) {
            return;
        }
        delOne(bookId)
        context.page.redirect('/catalog')
    }
    async function onLike() {
        await postLike(bookId);
        canLike = false;
        likesCount ++;
        context.render(detailsTemplate(book, false, onDelete, onLike, canLike, likesCount));
    }
}
