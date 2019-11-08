import React from 'react';
import './App.css';
import purchases from './data';

function App() {
    const customersTotalPoints = [];
    let points = (total) => {
        let totalPointsEarned = 0;
        if (total > 50 && total < 100) {
            return totalPointsEarned = total - 50;
        } else {
            totalPointsEarned = Math.floor(total - 100) * 2 + 50;
            return totalPointsEarned;
        }
    }

    let enableSort = (a, b) => {
        if (a.customerNumber < b.customerNumber) {
            return -1;
        }

        if (a.customerNumber > b.customerNumber) {
            return 1;
        }

        return 0;
    };

    let calculateTotals = (sortedArray) => {
        let totalPoints = 0;
        let pointTotals = {};
        let sortedByCustomerNumber = sortedArray.sort(enableSort);

        for (let i = 0; i < sortedByCustomerNumber.length; i++) {
            totalPoints = sortedByCustomerNumber[i].pointsAwarded;
            let index = 0;

            while (index <= sortedByCustomerNumber.length) {
                let counter = 0;

                while (sortedByCustomerNumber[index].customerNumber === sortedByCustomerNumber[i].customerNumber) {
                    totalPoints += sortedByCustomerNumber[i++].pointsAwarded;
                    counter++;

                    if (i === sortedByCustomerNumber.length) {
                        pointTotals = { customerName: sortedByCustomerNumber[i - 1].customerName, customerNumber: sortedByCustomerNumber[i - 1].customerNumber, totalPoints };
                        return customersTotalPoints.push(pointTotals);
                    }
                }
                pointTotals = { customerName: sortedByCustomerNumber[i - 1].customerName, customerNumber: sortedByCustomerNumber[i - 1].customerNumber, totalPoints };
                customersTotalPoints.push(pointTotals);
                totalPoints = 0;
                index += counter;
            }
        }
    }

    let sortTheArray = () => {

        let sortedArray = [];
        let sortedAndFlat = [];

        for (let purchase of purchases) {

            for (let month in purchase) {
                for (let getTotal in purchase[month]) {
                    purchase[month][getTotal].pointsAwarded = points(parseInt(purchase[month][getTotal].total.replace(/\$/g, '')));
                }

                let sorted = purchase[month].sort(enableSort);

                sortedArray.push(sorted);

            };
        };

        sortedAndFlat = [].concat.apply([], sortedArray);

        calculateTotals(sortedAndFlat);

    }
    
    sortTheArray();



    return (

        <div className="table">
            <div className="columns"><p className="columns">Customer Number</p><p className="columns">Customer Name</p><p className="columns">Total Points</p></div>
            <div>{customersTotalPoints.map((customer, index) => {
                return <div className="data" key={index}><p>{customer.customerNumber}</p><p>{customer.customerName}</p><p>{customer.totalPoints}</p></div>
            })})</div>
        </div>
    );
}
export default App;
