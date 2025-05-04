import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    size: '',
    shape: '',
    edge: '',
    finish: '',
    quantity: 1,
    designPrompt: '',
  });

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateImage = async () => {
    setLoading(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setImageUrl(data.imageUrl);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🪙 AI Challenge Coin Builder</h1>
      
      <form onSubmit={(e) => { e.preventDefault(); generateImage(); }}>
        <label>Size:
          <select name="size" onChange={handleChange}>
            <option value="">Select Size</option>
            <option value="1.75 inch">1.75 inch</option>
            <option value="2 inch">2 inch</option>
            <option value="2.5 inch">2.5 inch</option>
          </select>
        </label><br/><br/>

        <label>Shape:
          <select name="shape" onChange={handleChange}>
            <option value="">Select Shape</option>
            <option value="Round">Round</option>
            <option value="Custom">Custom</option>
          </select>
        </label><br/><br/>

        <label>Edge Style:
          <select name="edge" onChange={handleChange}>
            <option value="">Select Edge</option>
            <option value="Standard">Standard</option>
            <option value="Rope">Rope</option>
            <option value="Cog">Cog</option>
          </select>
        </label><br/><br/>

        <label>Finish:
          <select name="finish" onChange={handleChange}>
            <option value="">Select Finish</option>
            <option value="Antique Silver">Antique Silver</option>
            <option value="Shiny Gold">Shiny Gold</option>
          </select>
        </label><br/><br/>

        <label>Quantity:
          <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} />
        </label><br/><br/>

        <label>Describe your design idea:
          <textarea name="designPrompt" onChange={handleChange} placeholder="Describe your coin design..." />
        </label><br/><br/>

        <button type="submit">Generate AI Preview</button>
      </form>

      {loading && <p>Generating image...</p>}

      {imageUrl && (
        <div>
          <h2>AI Generated Preview:</h2>
          <img src={imageUrl} alt="AI Generated Coin" style={{ width: "300px", border: "1px solid #ccc" }} />
        </div>
      )}
    </div>
  );
}
