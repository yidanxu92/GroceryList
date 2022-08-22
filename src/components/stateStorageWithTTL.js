import React from 'react';

export function setWithExpiry(key,value,ttl){

    /*First, we clear what is already there before we set the item,
    make sure there is always only one lastOpen item */

   /* if (localStorage.getItem('lastOpen'))
    {
        localStorage.removeItem('lastOpen')
    }*/

    /* we then create and add the new item*/

    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))

}


export function getWithExpiry() {
    console.log("getWithExpiry is called!")
    const itemStr = localStorage.getItem('lastOpen')

    // if the item doesn't exist, return null
    if (!itemStr) {
        console.log("lastOpen does not exist!")
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        console.log("last open exists, but we are in if statement, the item is expired!")
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem('lastOpen')
        return null
    }
    console.log("the item exists! we will return value")
    return item.value
}