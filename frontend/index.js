/* <div class="itme-list">
        <img src="assets/image.svg" alt="" />
        <div class="itme-list__info">
          <div class="item-list__info-title">게이밍 PC 팝니다.</div>
          <div class="item-list__info-meta">역삼동 19초 전</div>
          <div class="item-list__info-price">100만원</div>
        </div>
      </div> */

const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const seconds = time.getSeconds();

  if (hour > 0) {
    return `${hour}시간 전`;
  } else if (minute > 0) {
    return `${minute}분 전`;
  } else if (seconds > 0) {
    return `${seconds}초 전`;
  } else {
    return "방금 전";
  }
};

const renderData = (data) => {
  const main = document.querySelector("main");
  data.reverse().forEach(async (obj) => {
    const time = new Date().getTime();
    const div = document.createElement("div");
    div.className = "item-list";

    const ImgDiv = document.createElement("div");
    ImgDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "item-list__info";

    const InfoTitleDiv = document.createElement("div");
    InfoTitleDiv.className = "item-list__info-title";
    InfoTitleDiv.innerText = obj.title;

    const InfoMetaDiv = document.createElement("div");
    InfoMetaDiv.className = "item-list__info-meta";
    InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

    const InfoPriceDiv = document.createElement("div");
    InfoPriceDiv.className = "item-list__info-price";
    InfoPriceDiv.innerText = obj.price + "원";

    InfoDiv.appendChild(InfoTitleDiv);
    InfoDiv.appendChild(InfoMetaDiv);
    InfoDiv.appendChild(InfoPriceDiv);
    ImgDiv.appendChild(img);
    div.appendChild(ImgDiv);
    div.appendChild(InfoDiv);
    main.appendChild(div);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
