function solution(command) {
    const processor = {
        upvote: () => this.upvotes++,
        downvote: () => this.downvotes++,
        score: () => {
            const ups = this.upvotes;
            const downs = this.downvotes;

            let reportedUps = ups;
            let reportedDowns = downs;
            if (ups + downs > 50) {
                let addition = reportedUps > reportedDowns
                    ? Math.ceil(reportedUps * 0.25)
                    : Math.ceil(reportedDowns * 0.25)
                reportedUps += addition;
                reportedDowns += addition;
            };

            const balance = ups - downs;
            const sum = ups + downs;
            let rating = '';
            if (ups > sum * 0.66 && sum >= 10) {
                rating = 'hot';
            } else if (balance >= 0 && sum > 100) {
                rating = 'controversial';
            } else if (balance < 0 && sum >= 10) {
                rating = 'unpopular';
            } else {
                rating = 'new';
            };

            return [reportedUps, reportedDowns, balance, rating];
        }
    };
    return processor[command]();
};

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score');
console.log(score)

let forumPost = {
    id: '1',
    author: 'pesho',
    content: 'hi guys',
    upvotes: 0,
    downvotes: 0
};
solution.call(forumPost, 'upvote');
let answer = solution.call(forumPost, 'score');
console.log(answer)
