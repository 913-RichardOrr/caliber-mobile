import { AssociateWithFeedback } from "./AssociateService";
/**
 * Sorting method by first name (first to last)
 * @param associates 
 */
export function sortAssociateByFirstName(associates: AssociateWithFeedback[]) {
    associates.sort((a, b) => {
        if (a.associate.firstName.length >= b.associate.firstName.length) {
            for (let i = 0; i < b.associate.firstName.length; i++) {
                let check = (a.associate.firstName.charCodeAt(i)) - (b.associate.firstName.charCodeAt(i));
                if (check != 0) {
                    return check;
                }
            }
        } else {
            for (let i = 0; i < a.associate.firstName.length; i++) {
                let check = (a.associate.firstName.charCodeAt(i)) - (b.associate.firstName.charCodeAt(i));
                if (check != 0) {
                    return check;
                }
            }
        }
    });
}

/**
 * Sorting method by first name (last to first)
 * @param associates 
 */
export function sortAssociateByFirstNameReversed(associates: AssociateWithFeedback[]) {
    associates.sort((a, b) => {
        if (a.associate.firstName.length >= b.associate.firstName.length) {
            for (let i = 0; i < b.associate.firstName.length; i++) {
                let check = (b.associate.firstName.charCodeAt(i)) - (a.associate.firstName.charCodeAt(i));
                if (check != 0) {
                    return check;
                }
            }
        } else {
            for (let i = 0; i < a.associate.firstName.length; i++) {
                let check = (b.associate.firstName.charCodeAt(i)) - (a.associate.firstName.charCodeAt(i));
                if (check != 0) {
                    return check;
                }
            }
        }
    });
}

/**
 * Sorting method by last name (first to last)
 * @param associates 
 */
export function sortAssociateByLastName(associates: AssociateWithFeedback[]) {
    associates.sort((a, b) => {
        if (a.associate.lastName.length >= b.associate.lastName.length) {
            for (let i = 0; i < b.associate.lastName.length; i++) {
                let check = (a.associate.lastName.charCodeAt(i)) - (b.associate.lastName.charCodeAt(i));
                if (check != 0) {
                    return check;
                }
            }
        } else {
            for (let i = 0; i < a.associate.lastName.length; i++) {
                let check = (a.associate.lastName.charCodeAt(i)) - (b.associate.lastName.charCodeAt(i));
                if (check != 0) {
                    return check;
                }
            }
        }
    });
}

/**
 * Sorting method by last name (last to first)
 * @param associates 
 */
export function sortAssociateByLastNameReversed(associates: AssociateWithFeedback[]) {
    associates.sort((a, b) => {
        if (a.associate.lastName.length >= b.associate.lastName.length) {
            for (let i = 0; i < b.associate.lastName.length; i++) {
                let check = (b.associate.lastName.charCodeAt(i)) - (a.associate.lastName.charCodeAt(i));
                if (check != 0) {
                    return check;
                }
            }
        } else {
            for (let i = 0; i < a.associate.lastName.length; i++) {
                let check = (b.associate.lastName.charCodeAt(i)) - (a.associate.lastName.charCodeAt(i));
                if (check != 0) {
                    return check;
                }
            }
        }
    });
}

export function shuffle(associates: AssociateWithFeedback[]) {
    var currentIndex = associates.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = associates[currentIndex];
        associates[currentIndex] = associates[randomIndex];
        associates[randomIndex] = temporaryValue;
    }

    return associates;
}