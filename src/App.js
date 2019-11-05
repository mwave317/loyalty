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

    let createTable = (points) => {
        if (points) {
            points.map(customer => {
                return <div><p>{customer.customerName}</p><p>{customer.customerNumber}{customer.totalPoints}</p></div>
            });
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
        //   let customersTotalPoints = [];

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
                        customersTotalPoints.push(pointTotals);
                        createTable(customersTotalPoints);
                        return
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

        // Add the points and sort the array by Customer Name


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

    const columns = ['Customer Number', 'Customer Name', 'Total Points'];




    sortTheArray();



    return (

        <div class="table">
            <div class="columns"><p class=" columns">Customer Number</p><p class="columns">Customer Name</p><p class="columns">Total Points</p></div>
            <div>{customersTotalPoints.map(customer => {
                return <div class="data"><p>{customer.customerNumber}</p><p>{customer.customerName}</p><p>{customer.totalPoints}</p></div>
            })}</div>
        </div>
    );

}
export default App;
