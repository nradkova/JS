class Vacationer {
    constructor(fullName, creditCard) {
        this.fullName = fullName;
        this.creditCard = creditCard;
        this.wishList = [];
        this.idNumber = this.generateIDNumber();
    }

    set fullName(value) {
        if (value.length != 3) {
            throw new Error("Name must include first name, middle name and last name");
        }
        if (!(/^([A-Z][a-z]+) ([A-Z][a-z]+) ([A-Z][a-z]+)$/g).test(value.join(' '))) {
            throw new Error('Invalid full name')
        }
        this._fullName = {
            firstName: value[0],
            middleName: value[1],
            lastName: value[2]
        }
    }

    get fullName() {
        return this._fullName;
    }

    set creditCard(value) {
        if (!value) {
            this._creditCard = {
                cardNumber: 1111,
                expirationDate: '',
                securityNumber: 111
            }
        } else {
            if (value.length != 3) {
                throw new Error("Missing credit card information");
            }
            if (typeof value[0] !== 'number' || typeof value[2] !== 'number') {
                throw new Error("Invalid credit card details");
            }
            this._creditCard = {
                cardNumber: value[0],
                expirationDate: value[1],
                securityNumber: value[2]
            }
        }
    }

    get creditCard() {
        return this._creditCard;
    }

    generateIDNumber() {
        let id = 231 * this.fullName.firstName.charCodeAt(0)
            + 139 * this.fullName.middleName.length;
        let lastChar = this.fullName.lastName[this.fullName.lastName.length - 1];
        if (lastChar == "a" || lastChar == "e" || lastChar == "o" ||
            lastChar == "i" || lastChar == "u") {
            id += '8';
        } else {
            id += '7';
        }
        return id;
    }

    addCreditCardInfo(input) {
        if (input.length != 3) {
            throw new Error("Missing credit card information");
        }
        if (typeof input[0] !== 'number' || typeof input[2] !== 'number') {
            throw new Error("Invalid credit card details");
        }
        this.creditCard.cardNumber = input[0];
        this.creditCard.expirationDate = input[1];
        this.creditCard.securityNumber = input[2];
    }

    addDestinationToWishList(destination) {
        if (this.wishList.includes(destination)) {
            throw new Error("Destination already exists in wishlist");
        }
        this.wishList.push(destination);
        this.wishList.sort((a, b) => a.length - b.length);
    }

    getVacationerInfo() {
        return `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}
ID Number: ${this.idNumber}
Wishlist:
${this.wishList.length === 0 ? 'empty' : this.wishList.join(', ')}
Credit Card:
Card Number: ${this.creditCard.cardNumber}
Expiration Date: ${this.creditCard.expirationDate}
Security Number: ${this.creditCard.securityNumber}`;
    }
};

// // Initialize vacationers with 2 and 3 parameters
// let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
// let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"],
//     [123456789, "10/01/2018", 777]);

// // Should throw an error (Invalid full name)
// try {
//     let vacationer3 = new Vacationer(["Vania", "Ivanova", "ZhiVkova"]);
// } catch (err) {
//     console.log("Error: " + err.message);
// }

// // Should throw an error (Missing credit card information)
// try {
//     let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
//     vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
// } catch (err) {
//     console.log("Error: " + err.message);
// }

// vacationer1.addDestinationToWishList('Spain');
// vacationer1.addDestinationToWishList('Germany');
// vacationer1.addDestinationToWishList('Bali');

// // Return information about the vacationers
// console.log(vacationer1.getVacationerInfo());
// console.log(vacationer2.getVacationerInfo());

let classInstance2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"], [123456789, "10/01/2018", 777])
classInstance2.addDestinationToWishList('Spain');
classInstance2.addDestinationToWishList('Germany');
//'Name: Vania Ivanova Zhivkova\nID Number: 208398\nWishlist:\nSpain, Germany\nCredit Card:\nCard Number: 1111\nExpiration Date: \nSecurity Number: 111');
console.log(classInstance2.getVacationerInfo())
