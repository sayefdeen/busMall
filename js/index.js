var imageContainer = document.getElementById("content-img");

// console.log(imageContainer.children[0].attributes.src.value);
// imageContainer.children[0].attributes.src.value = "../img/banana.jpg";

var allProducts = [];
var totalClicks = 25;
var allNames = [];
var allClickes = [];
var allViews = [];
var randomColors = [];
var nextArray = [];
var checkArr = [];

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
  checkArr = nextArray;
  console.log("Checked Array values " + checkArr);
  nextArray = [];

  for (var i = 0; i < 3; i++) {
    nextArray.push(generateRandomNumber());
  }

  while (
    nextArray[0] === nextArray[1] ||
    nextArray[1] === nextArray[2] ||
    nextArray[0] === nextArray[2]
  ) {
    nextArray[1] = generateRandomNumber();
    nextArray[2] = generateRandomNumber();
  }
  for (var i = 0; i < checkArr.length; i++) {
    for (var j = 0; j < nextArray.length - 1; j++) {
      while (checkArr[i] == nextArray[j]) {
        nextArray[j] = generateRandomNumber();
      }
    }
  }
  console.log("Next Array values " + nextArray);

  for (var i = 0; i < imageContainer.children.length; i++) {
    var img = imageContainer.children[i];
    img.setAttribute("src", allProducts[nextArray[i]].path);
    img.setAttribute("name", allProducts[nextArray[i]].name);
    allProducts[nextArray[i]].numberOfViews++;
  }
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

function getRandomColor() {
  var letters = "0123456789ABCDEF";

  for (var j = 0; j < allProducts.length; j++) {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    randomColors.push(color);
  }
}

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
  getRandomColor();
  var ctx = document.getElementById("clickedChart");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: allNames,
      datasets: [
        {
          label: "# of Clicks",
          data: allClickes,
          backgroundColor: randomColors,
          borderColor: randomColors,
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
              max: 10,
            },
          },
        ],
      },
    },
  });

  myChart.canvas.parentNode.style.height = "100%";
  myChart.canvas.parentNode.style.width = "50%";
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
          backgroundColor: randomColors,
          borderColor: randomColors,
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
              max: 10,
            },
          },
        ],
      },
    },
  });

  myChart.canvas.parentNode.style.height = "100%";
  myChart.canvas.parentNode.style.width = "100%";
}
