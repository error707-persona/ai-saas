
import os

output_folder = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))[:-7], 'frontend', 'public', 'result_images')
print("output_folder",output_folder)
os.makedirs(output_folder, exist_ok=True)