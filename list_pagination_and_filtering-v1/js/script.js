/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const pageListItems = 10;
const pageDiv = document.querySelector('.page');
const pageHeaderDiv = document.getElementsByClassName('page-header');
const listItems = document.querySelectorAll('li');
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';
pageDiv.appendChild(paginationDiv);
// console.log(listItems)

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (index, listItem) => {
   const startIndex = (index * pageListItems) - pageListItems;
   const lastIndex = index * pageListItems;

   for (let i = 0; i < listItem.length; i++) {
      if (i >= startIndex && i < lastIndex) {
         listItem[i].style.display = 'block';
      } else {
         listItem[i].style.display = 'none';
      }
   }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (listItem) => {
   const totalPages = Math.ceil(listItem.length / pageListItems);
   const ul = document.createElement('ul');
   paginationDiv.appendChild(ul);

   for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      const link = document.createElement('a');

      ul.appendChild(li);
      li.appendChild(link);

      console.log()
      link.href = '#';
      link.textContent = i;

      if (link.textContent == 1) {
         link.className = 'active';
      }

      link.addEventListener('click', (e) => {
         showPage(i, listItem);
         document.querySelector('.active').classList.remove('active');
         const clickedLink = event.target;
         clickedLink.classList.add('active');
      });
   }
}



showPage(1, listItems);
appendPageLinks(listItems);
// Remember to delete the comments that came with this file, and replace them with your own code comments.