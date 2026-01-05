const elForm = document.querySelector(".section__form");
const elBoxes = document.querySelector(".section__top-boxes");
const elLabel = document.querySelector(".section__label");
const elOutput = document.querySelector(".section__output");
const elCopy = document.querySelector(".section__copy");
const elLeftBoxes = document.querySelectorAll(".left__boxes");
let windowStatus = 0;
let choose = false;
for(var i = 0; i < elLeftBoxes.length; i++) {
  leftBoxes(i);
}

function leftBoxes(i) {
  elLeftBoxes[i].addEventListener("click", ()=> {
    windowStatus = i;
    leftBoxesStatus(i)
  })
}
function leftBoxesStatus(index) {
  index == 1 ? elBoxes.classList.add("none") : true;
  index == 0 ? elBoxes.classList.remove("none") : true;
}
elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const elInput = elForm["input"].value.trim().toUpperCase();
  if (!elInput) {
    elLabel.classList.add("warning");
    elLabel.textContent = "Fill DNA!";
    setTimeout(() => {
      if (choose && windowStatus == 0) {
        elLabel.textContent = "DNA => RNA";
      } else {
        elLabel.textContent = "DNA";
      }
      elLabel.classList.remove("warning");
    }, 800);
  } else {
    elLabel.classList.remove("warning");
    if (choose || windowStatus != 0) {
      if(windowStatus == 0) {
        elLabel.textContent = "DNA => RNA";
      }
      if (checkDNA(elInput)) {
        const rna = elInput.replaceAll("T", "U");
        elOutput.textContent = `${rna}`;
      } else {
        elLabel.classList.add("warning");
        elLabel.textContent = "DNA isn't right!";
        setTimeout(() => {
          if (choose) {
            elLabel.textContent = "DNA => RNA";
          } else {
            elLabel.textContent = "DNA";
          }
          elLabel.classList.remove("warning");
        }, 800);
      }
    } else {
      elLabel.textContent = "DNA";
      elLabel.classList.add("warning");
      elLabel.textContent = "Choose RNA or etc. !";
      setTimeout(() => {
        elLabel.classList.remove("warning");
        elLabel.textContent = "DNA";
      }, 1500);
    }
  }
});

elBoxes.addEventListener("click", () => {
  elLabel.textContent = "DNA => RNA";
  elLabel.classList.remove("warning");
  choose = true;
});

function checkDNA(text) {
  const dnaRegExp = /^[ATGC]+$/;
  return dnaRegExp.test(`${text}`) ? true : false;
}

let toastStatus = false;
elCopy.addEventListener("click", () => {
  if (!toastStatus) {
    toastStatus = true;
    const textToCopy = elOutput.innerText;
    if (elOutput.innerText) {
      if (elOutput.innerText != "RNA is here") {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showToast("green", "Copied!");
          })
          .catch((err) => {
            showToast("red", "Not copied!");
          });
      }
    }
    if (toastStatus) {
      setTimeout(() => {
        toastStatus = false;
      }, 3000);
    }
  }
});

function showToast(color, text) {
  Toastify({
    text: `${text}`,
    duration: 3000, // 5 soniya
    gravity: "top", // Yuqori qism
    position: "right", // O'ng tomon
    close: false,
    stopOnFocus: true,
    style: {
      background: "white",
      color: "black", // Matn rangini qora qilamiz
      borderRadius: "5px", // Yumaloq burchaklar
      borderLeft: `5px solid ${color}`, // Chap tomonda ko'k rangli chiziq qo'shamiz (progress bar o'rniga)
      // boxShadow: "0 3px 10px rgba(0,0,0,0.1)", // Engil soya
      padding: "15px",
      fontFamily: "sans-serif",
      boxShadow: `2px 0px 10px -3px ${color}`,
    },
  }).showToast();
}
