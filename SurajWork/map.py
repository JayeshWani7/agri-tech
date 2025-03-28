import rasterio
import numpy as np
import os
import matplotlib.pyplot as plt
import cv2
from rasterio.plot import show
from sklearn.cluster import KMeans
from rasterio.enums import Resampling

# Load the satellite image
def load_image(image_path):
    dataset = rasterio.open(image_path)
    return dataset

# Compute NDVI (Vegetation Health)
def compute_ndvi(red_band, nir_band):
    ndvi = (nir_band - red_band) / (nir_band + red_band + 1e-5)
    return ndvi

# Compute NDMI (Soil Moisture)
def compute_ndmi(nir_band, swir_band):
    ndmi = (nir_band - swir_band) / (nir_band + swir_band + 1e-5)
    return ndmi

# Compute NDWI (Water Resources)
def compute_ndwi(green_band, nir_band):
    ndwi = (green_band - nir_band) / (green_band + nir_band + 1e-5)
    return ndwi

# Compute Topography (Slope & Elevation)
def compute_slope_elevation(dem_path):
    with rasterio.open(dem_path) as dem:
        elevation = dem.read(1)  # Read DEM elevation data
        x, y = np.gradient(elevation)  # Compute gradient
        slope = np.arctan(np.sqrt(x**2 + y**2)) * (180 / np.pi)  # Convert to degrees
    return elevation, slope

# Land Use / Land Cover Classification using K-Means Clustering
def classify_land_use(image_path, num_classes=4):
    with rasterio.open(image_path) as src:
        img = src.read([1, 2, 3]).astype(np.float32)  # Use RGB bands
        img_reshaped = img.reshape(-1, 3)  # Reshape for clustering

        kmeans = KMeans(n_clusters=num_classes, random_state=42)
        labels = kmeans.fit_predict(img_reshaped)
        classified_image = labels.reshape(img.shape[1], img.shape[2])  # Reshape back
    return classified_image

# Function to extract coordinates (bounding box)
def get_coordinates(dataset):
    bounds = dataset.bounds  # Get min/max coordinates
    coord_str = f"{bounds.left:.2f}_{bounds.bottom:.2f}_{bounds.right:.2f}_{bounds.top:.2f}"
    return coord_str

# Function to save and visualize results inside a coordinate folder
def save_and_show(data, folder_path, filename, cmap="viridis"):
    os.makedirs(folder_path, exist_ok=True)  # Ensure directory exists
    file_path = os.path.join(folder_path, filename)

    plt.imshow(data, cmap=cmap)
    plt.colorbar()
    plt.title(filename)
    plt.savefig(file_path)
    plt.show()

# Main function to process image
def process_satellite_image(image_path, dem_path):
    dataset = load_image(image_path)

    # Extract coordinates
    coordinates = get_coordinates(dataset)
    folder_path = os.path.join("Processed_Images", coordinates)  # Create folder

    # Extract bands
    red = dataset.read(3).astype(np.float32)  # Red band (Landsat-8 Band 4)
    nir = dataset.read(4).astype(np.float32)  # NIR band (Landsat-8 Band 5)
    swir = dataset.read(5).astype(np.float32)  # SWIR band (Landsat-8 Band 6)
    green = dataset.read(2).astype(np.float32)  # Green band (Landsat-8 Band 3)

    # Compute indices
    ndvi = compute_ndvi(red, nir)
    ndmi = compute_ndmi(nir, swir)
    ndwi = compute_ndwi(green, nir)

    # Compute elevation and slope
    elevation, slope = compute_slope_elevation(dem_path)

    # Classify land cover
    land_cover = classify_land_use(image_path)

    # Save and visualize results in the folder
    save_and_show(ndvi, folder_path, "NDVI_Vegetation_Health.png", cmap="RdYlGn")
    save_and_show(ndmi, folder_path, "NDMI_Soil_Moisture.png", cmap="Blues")
    save_and_show(ndwi, folder_path, "NDWI_Water_Resources.png", cmap="coolwarm")
    save_and_show(elevation, folder_path, "Elevation_Map.png", cmap="terrain")
    save_and_show(slope, folder_path, "Slope_Map.png", cmap="gray")
    save_and_show(land_cover, folder_path, "Land_Cover_Map.png", cmap="tab10")

    print(f"Processed images saved in: {folder_path}")

# Run the script with your image paths
satellite_image_path = "agri-tech.tif"
dem_image_path = "DEM_VillageElevation.tif"

process_satellite_image(satellite_image_path, dem_image_path)
