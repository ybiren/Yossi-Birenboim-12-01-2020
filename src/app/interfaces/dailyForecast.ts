export interface IDailyForecast {
    EpochDate: Number,
    Temperature : {
        Minimum: {
            Value: Number
        },
        Maximum: {
            Value: Number
        }   
    }
}