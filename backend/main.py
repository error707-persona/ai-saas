from fastapi import FastAPI, HTTPException
import torch
from diffusers import StableDiffusionPipeline
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import yake
import os
import uuid

app = FastAPI()
model_id = "CompVis/stable-diffusion-v1-4"
device = "cpu"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float32)
pipe = pipe.to(device)
kw_extractor = yake.KeywordExtractor()
output_folder = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))[:-7], 'frontend', 'public', 'result_images')
print("output_folder",output_folder)
os.makedirs(output_folder, exist_ok=True)
class Prompt(BaseModel):
    prompt: str = None 

class Result(BaseModel):
    image: str = None

# Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate_image", response_model=Result)
def generateImage(prompt:Prompt):
    image = pipe(prompt.prompt).images[0]  
    unique_id = uuid.uuid4().int 
    print(kw_extractor.extract_keywords(prompt))
    file_name = "".join(kw_extractor.extract_keywords(prompt)) + str(unique_id) + ".png"
    print(file_name)
    save_path = os.path.join(output_folder, file_name)
    print("save at: ", save_path)
    image.save(save_path)
    return { "image" : "/result_images/"+file_name }


