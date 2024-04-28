const form = document.querySelector("#login-form");

const handleSubmitLoginForm = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));

  formData.set("password", sha256Password);
  //console.log(formData.get("password"));
  const res = await fetch("/login", {
    method: "post",
    body: formData,
  });
  if (res.status == 200) {
    const data = await res.json();
    const accessToken = data.access_token;

    window.localStorage.setItem("token", accessToken);
    alert("로그인 되었습니다.");

    window.location.pathname = "/";
  } else {
    alert("id 또는 패스워드가 틀립니다.");
  }

  //   const btn = document.createElement("button");
  //   btn.innerText = "상품 가져오기";
  //   btn.addEventListener("click", async () => {
  //     const res = await fetch("/items", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   });
  //   info.appendChild(btn);
};

form.addEventListener("submit", handleSubmitLoginForm);
