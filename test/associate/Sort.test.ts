import { AssociateWithFeedback } from "../../associate/AssociateService";
import { shuffle, sortAssociateByFirstName, sortAssociateByLastName } from "../../associate/sort";

let associate1:AssociateWithFeedback;
let associate2:AssociateWithFeedback;
let associate3:AssociateWithFeedback;
let associate4:AssociateWithFeedback;
let associate5:AssociateWithFeedback;
let testSet: AssociateWithFeedback[] = [];
let orderedSet: AssociateWithFeedback[] = [];
beforeEach(() => {
    associate1 = new AssociateWithFeedback();
    associate2 = new AssociateWithFeedback();
    associate3 = new AssociateWithFeedback();
    associate4 = new AssociateWithFeedback();
    associate5 = new AssociateWithFeedback();
    testSet = [associate1, associate2, associate3, associate4];
})

describe("Tests for sorting associates by first name.", () => {

    test("Sorting by names with different first letter of first name", () => {
        testSet[1].associate.firstName = "Aaa";
        testSet[2].associate.firstName = "Bbb";
        testSet[0].associate.firstName = "Ccc";
        testSet[3].associate.firstName = "Ddd";
        orderedSet = [testSet[1], testSet[2], testSet[0], testSet[3]]
        sortAssociateByFirstName(testSet);
        expect(testSet).toStrictEqual(orderedSet);
    });

    test("Sorting by names with same first letter but different 2nd letter", () => {
        testSet[1].associate.firstName = "Appa";
        testSet[2].associate.firstName = "Azza";
        testSet[0].associate.firstName = "Adda";
        testSet[3].associate.firstName = "Acca";
        orderedSet = [testSet[3], testSet[0], testSet[1], testSet[2]]
        sortAssociateByFirstName(testSet);
        expect(testSet).toStrictEqual(orderedSet);
    });

    test("Sorting by two names where one name is a substring of another one", () => {
        testSet[1].associate.firstName = "John";
        testSet[2].associate.firstName = "Johnathan";
        testSet[0].associate.firstName = "Ccc";
        testSet[3].associate.firstName = "Ddd";
        orderedSet = [testSet[0], testSet[3], testSet[1], testSet[2]]
        sortAssociateByFirstName(testSet);
        expect(testSet).toStrictEqual(orderedSet);
    });
    test("Testing for where there are two of the same name", () => {
        testSet[1].associate.firstName = "Alpha";
        testSet[2].associate.firstName = "Alpha";
        testSet[0].associate.firstName = "Beta";
        testSet[3].associate.firstName = "Charlie";
        orderedSet = [testSet[1], testSet[2], testSet[0], testSet[3]]
        sortAssociateByFirstName(testSet);

        expect(testSet).toStrictEqual(orderedSet);
    });
})

describe("Tests for sorting by last name", () => {
    test("Sorting by names with different first letter of last name", () => {
        testSet[1].associate.lastName = "Aaa";
        testSet[2].associate.lastName = "Bbb";
        testSet[0].associate.lastName = "Ccc";
        testSet[3].associate.lastName = "Ddd";
        orderedSet = [testSet[1], testSet[2], testSet[0], testSet[3]]
        sortAssociateByLastName(testSet);
        expect(testSet).toStrictEqual(orderedSet);
    });

    test("Sorting by two names where one name is a substring of another one", () => {
        testSet[2].associate.lastName = "Clark";
        testSet[3].associate.lastName = "Clarkson";
        testSet[1].associate.lastName = "David";
        testSet[0].associate.lastName = "Smith";
        orderedSet = [testSet[2], testSet[3], testSet[1], testSet[0]]
        sortAssociateByLastName(testSet);
        expect(testSet).toStrictEqual(orderedSet);
    });
    test("Testing for where there are two of the same name", () => {
        testSet[3].associate.lastName = "Daniel";
        testSet[1].associate.lastName = "Daniel";
        testSet[2].associate.lastName = "Tyler";
        testSet[0].associate.lastName = "Powerangers";
        orderedSet = [testSet[3], testSet[1], testSet[0], testSet[2]]
        sortAssociateByLastName(testSet);

        expect(testSet).toStrictEqual(orderedSet);
    });

})

describe("Tests for randomzing the order of the associates", () => {
    testSet = [...testSet,associate5];
    
    test("Make sure that first random set works.", () => {
        testSet.push(associate5);
        testSet[0].associate.firstName = "Alpha";
        testSet[1].associate.firstName = "Bravo";
        testSet[2].associate.firstName = "Charlie";
        testSet[3].associate.firstName = "Delta";
        testSet[4].associate.firstName = "Echo";
        orderedSet = [...testSet];
        
        testSet = shuffle(testSet);
        
        expect(testSet).not.toStrictEqual(orderedSet);
        expect(testSet.length).toBe(orderedSet.length);
    })

})