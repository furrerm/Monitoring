const TimeOfInterest = {

    HOUR: {
        ID: 1,
        ENTITIES: 1,
        LABELS: ["none"]
    },
    DAY: {
        ID: 2,
        ENTITIES: 24,
        LABELS: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
    },
    WEEK: {
        ID: 3,
        ENTITIES: 7,
        LABELS: ["Mo", "Di","Mi", "Do", "Fr", "Sa", "So", ]
    },
    MONTH: {
        ID: 4,
        ENTITIES: 31,
        LABELS: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    },
    YEAR: {
        ID: 5,
        ENTITIES: 12,
        LABELS: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']

    }

};
/*
const TimeOfInterest = {
    HOUR: 1,
    DAY: 2,
    LARGE: 3,
    properties: {
        1: {name: "small", value: 1, code: "S"},
        2: {name: "medium", value: 2, code: "M"},
        3: {name: "large", value: 3, code: "L"}
    }
};
*/