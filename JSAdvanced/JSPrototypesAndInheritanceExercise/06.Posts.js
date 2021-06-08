function result() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }
        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }
        addComment(comment) {
            this.comments.push(comment);
        }
        toString() {
            let commentsStr = this.comments.join('\n * ');
            let baseResult = super.toString() + `\nRating: ${this.likes - this.dislikes}`;
            if (commentsStr === '') {
                return baseResult;
            }
            return baseResult + `\nComments:\n * ${commentsStr}`;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }
        view() {
            this.views++;
            return this;

        }
        toString() {
            return super.toString() + `\nViews: ${this.views}`;
        }
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}

let classes = result();

let test = new classes.Post("Post", "Content");
console.log(test.title === "TestTitle");
console.log(test.toString());

let scm = new classes.SocialMediaPost("TestTitle", "TestContent", 25, 30);
scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");
console.log(scm.toString());

let bp = new classes.BlogPost("TestTitle", "TestContent", 30);
bp.view();
bp.view();
bp.view();
console.log(bp.toString());