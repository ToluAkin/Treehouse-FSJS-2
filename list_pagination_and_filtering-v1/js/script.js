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
const pageHeaderDiv = document.querySelector('.page-header');
const listItems = document.querySelectorAll('li');
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';
pageDiv.appendChild(paginationDiv);

/*** 
   The showPage function makes sure each page has 10 student details
   at a time. showPage(params) => index, number of the initial page while 
   listItem is the list of all the that will be looped through.
   By setting the style of each student length per page, to be seen 
   and the others be not displayed until the index of the student 
   is reached when navigated to.
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
   appendPageLinks function is for adding pagination links and number(index)
   to the pages. 
   => Gets the number of pages there will be by rounding up to the nearest whole
   number.
   => Creating a list element that will contain all the links and number of the
   pages.
   => Adding the numbers from the number of pages to the link created for
   navigating through the pages.
   => A click event listener is added to the links such that when clicked,
   the clicked link will show the expected number of student details and 
   remove the active class and add it to the clicked link.
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

/***
   filterStudent function matches the input field value with that of the student's names
   => Get the value of the input field and all the list of the student's names, 
   an empty array to fill all the names of the students that matches the value of the
   input field.
   => All the students will not be displayed until when the filter is going on.
   => Comparing the list of students and the value of the
   input field all in lowercase then transverse to the parentNode to get all the details
   of the student and adding them to the empty array if they match. If they don't match,
   the error message the no pagination should show.
   => If there is data in the array, it should show the details,
   paginated the page(s), make the first page active, no error
   message should be seen, no style to the pagination.
***/

const emptyData = document.createElement('div');
pageDiv.appendChild(emptyData);

const filterStudent = (inputValue) => {
   const searchContent = inputValue.value;
   const studentList = document.getElementsByTagName('h3');
   const matchedData = [];
   paginationDiv.innerHTML = '';

   listItems.forEach(listItem => {
      listItem.style.display = 'none';
   });

   for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].textContent.toLowerCase().includes(searchContent.toLowerCase())) {
         const studentDetails = studentList[i].parentNode.parentNode;
         matchedData.push(studentDetails);
      } else {
         emptyData.innerHTML = '<p> No student matches your search criteria. </p>';
         paginationDiv.style.display = 'none';
      }
   }

   if (matchedData != []) {
      showPage(1, matchedData);
      appendPageLinks(matchedData);
      document.querySelector('a').classList = 'active';
      paginationDiv.style.display = '';
      emptyData.innerHTML = '';
   } 
}

/***
   searchStudent function provides the look and the action
   on the in search box. 
   => The search box is created to the page header
   => The input field is created an added to the searchBox
   => A button is created to influence the input field.
   => Click event listener is added to the button to filter
   through the list of students when the button is clicked.
   => input event listener is added on the input field 
   to filter through the list of all students when there is a
   value in the input field.
***/

const searchStudent = () => {
   const searchBox = document.createElement('div');
   searchBox.className = 'student-search';
   pageHeaderDiv.appendChild(searchBox);

   const inputField = document.createElement('input');
   inputField.placeholder = 'search.....'
   searchBox.appendChild(inputField);

   const button = document.createElement('button');
   button.textContent = 'Filter';
   searchBox.appendChild(button);

   button.addEventListener('click', () => filterStudent(inputField))
   inputField.addEventListener('input', () => filterStudent(inputField))
}


showPage(1, listItems);
appendPageLinks(listItems);
searchStudent();