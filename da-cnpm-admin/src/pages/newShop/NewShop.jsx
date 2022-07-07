import "./newShop.css";

export default function NewProduct() {
  return (
    <div className="newShop">
      <h1 className="addShopTitle">New Shop</h1>
      <form className="addShopForm">
        <div className="addShopItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addShopItem">
          <label>Name</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addShopItem">
          <label>Stock</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addShopItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addShopButton">Create</button>
      </form>
    </div>
  );
}
