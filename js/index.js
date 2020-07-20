var imageContainer = document.getElementById("content-img");

// console.log(imageContainer.children[0].attributes.src.value);
// imageContainer.children[0].attributes.src.value = "../img/banana.jpg";

var allProducts = [];
var totalClicks = 25;
var firstIndex;
var secondIndex;
var thirdIndex;
var allNames = [];
var allClickes = [];
var allViews = [];

// Constructor

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.numberOfViews = 0;
  this.numberOfClicks = 0;

  allProducts.push(this);
  allNames.push(this.name);
}

// create Objects

var product1 = new Product("bag", "../img/bag.jpg");
var product2 = new Product("banana", "../img/banana.jpg");
var product3 = new Product("bathroom", "../img/bathroom.jpg");
var product4 = new Product("boots", "../img/boots.jpg");
var product5 = new Product("breakfast", "../img/breakfast.jpg");
var product6 = new Product("bubblegum", "../img/bubblegum.jpg");
var product7 = new Product("chair", "../img/chair.jpg");
var product8 = new Product("cthulhu", "../img/cthulhu.jpg");
var product9 = new Product("dragon", "../img/dragon.jpg");
var product10 = new Product("pen", "../img/pen.jpg");
var product11 = new Product("pet-sweep", "../img/pet-sweep.jpg");
var product12 = new Product("scissors", "../img/scissors.jpg");
var product13 = new Product("shark", "../img/shark.jpg");
var product14 = new Product("sweep", "../img/sweep.png");
var product15 = new Product("unicorn", "../img/unicorn.jpg");
var product16 = new Product("tauntaun", "../img/tauntaun.jpg");
var product17 = new Product("usb", "../img/usb.gif");
var product18 = new Product("water-can", "../img/water-can.jpg");

function generateRandomNumber() {
  var randomNumber = Math.floor(Math.random() * allProducts.length);
  return randomNumber;
}

function generateRAndomImage() {
  // Select the childern
  var firstImage = imageContainer.children[0];
  var secondImage = imageContainer.children[1];
  var thirdImage = imageContainer.children[2];

  firstIndex = generateRandomNumber();
  secondIndex = generateRandomNumber();
  thirdIndex = generateRandomNumber();

  while (
    firstIndex === secondIndex ||
    secondIndex === thirdIndex ||
    firstIndex === thirdIndex
  ) {
    secondIndex = generateRandomNumber();
    thirdIndex = generateRandomNumber();
  }
  //  get pahts
  var firstPath = allProducts[firstIndex].path;
  var secondPath = allProducts[secondIndex].path;
  var thirdPath = allProducts[thirdIndex].path;

  //   get names
  var firstName = allProducts[firstIndex].name;
  var secondName = allProducts[secondIndex].name;
  var thirdName = allProducts[thirdIndex].name;

  //   count viwed

  allProducts[firstIndex].numberOfViews++;
  allProducts[secondIndex].numberOfViews++;
  allProducts[thirdIndex].numberOfViews++;

  //  assign values

  firstImage.setAttribute("src", firstPath);
  secondImage.setAttribute("src", secondPath);
  thirdImage.setAttribute("src", thirdPath);
  firstImage.setAttribute("name", firstName);
  secondImage.setAttribute("name", secondName);
  thirdImage.setAttribute("name", thirdName);
}
generateRAndomImage();

imageContainer.addEventListener("click", function clickgenerator() {
  var eventId = event.target.id;
  var elementName = event.target.name;
  console.log(elementName);
  if (eventId != "content-img") {
    if (totalClicks > 0) {
      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name === elementName) {
          allProducts[i].numberOfClicks++;
          break;
        }
      }
      generateRAndomImage();
      totalClicks--;
    } else {
      generateMessage();
      getAllClickAndViews();
      generateViwedChart();
      generateClickedChart();
      imageContainer.removeEventListener("click", clickgenerator);
    }
  }
});

function getAllClickAndViews() {
  for (var i = 0; i < allProducts.length; i++) {
    allClickes.push(allProducts[i].numberOfClicks);
    allViews.push(allProducts[i].numberOfViews);
  }
}

function generateMessage() {
  var resultList = document.getElementById("result-list");
  var listItem;
  for (var i = 0; i < allProducts.length; i++) {
    listItem = document.createElement("li");
    listItem.textContent = `${allProducts[i].name} had ${allProducts[i].numberOfClicks} votes \n and was shown ${allProducts[i].numberOfViews} times`;
    resultList.appendChild(listItem);
  }
}

function generateClickedChart() {
  var ctx = document.getElementById("clickedChart");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: allNames,
      datasets: [
        {
          label: "# of Clicks",
          data: allClickes,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: allProducts.length,
            },
          },
        ],
      },
    },
  });

  myChart.canvas.parentNode.style.height = "100%";
  myChart.canvas.parentNode.style.width = "40%";
}

function generateViwedChart() {
  var ctx = document.getElementById("viwedChart");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: allNames,
      datasets: [
        {
          label: "# of Views",
          data: allViews,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: allProducts.length,
            },
          },
        ],
      },
    },
  });

  myChart.canvas.parentNode.style.height = "100%";
  myChart.canvas.parentNode.style.width = "40%";
}
