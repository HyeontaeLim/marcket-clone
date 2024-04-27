const form = document.querySelector("#signup-form");

const handleSubmitSignUPForm = async (event) => {
  event.preventDefault();
  const info = document.querySelector("#info");
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  const sha256PasswordCheck = sha256(formData.get("password-check"));

  if (sha256Password === sha256PasswordCheck) {
    formData.set("password", sha256Password);
    console.log(formData.get("password"));
    const res = await fetch("/signup", {
      method: "post",
      body: formData,
    });
    const data = await res.json();
    if (data === "200") {
      //   info.innerText = "회원가입에 성공했습니다.";
      //   info.style.color = "blue";
      alert("회원가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    info.innerText = "비밀번호가 일치하지 않습니다.";
    info.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmitSignUPForm);
