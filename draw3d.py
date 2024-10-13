import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Data koordinat dari vertex
vertices = [
    (0.0000, 0.0000, -1.0000),  # Vertex 1
    (0.0000, 0.9428, 0.3333),   # Vertex 2
    (-0.8165, -0.4714, 0.3333), # Vertex 3
    (0.8165, -0.4714, 0.3333)   # Vertex 4
]

# Memisahkan nilai x, y, z
x_vals = [v[0] for v in vertices]
y_vals = [v[1] for v in vertices]
z_vals = [v[2] for v in vertices]

# Membuat plot 3D
fig = plt.figure(figsize=(8, 8))
ax = fig.add_subplot(111, projection='3d')

# Plot titik-titik vertex
ax.scatter(x_vals, y_vals, z_vals, color='blue')

# Menandai setiap titik dengan label
for i, (x, y, z) in enumerate(vertices):
    ax.text(x, y, z, f'Vertex {i+1}', fontsize=12, ha='right')

# Menghubungkan vertex untuk membentuk wajah (seperti tetrahedron)
edges = [
    (0, 1), (0, 2), (0, 3),  # Garis dari Vertex 1 ke Vertex 2, 3, 4
    (1, 2), (1, 3), (2, 3)   # Garis dari Vertex 2 ke Vertex 3, Vertex 2 ke Vertex 4, Vertex 3 ke Vertex 4
]

# Menggambar garis penghubung
for edge in edges:
    x_edge = [x_vals[edge[0]], x_vals[edge[1]]]
    y_edge = [y_vals[edge[0]], y_vals[edge[1]]]
    z_edge = [z_vals[edge[0]], z_vals[edge[1]]]
    ax.plot(x_edge, y_edge, z_edge, color='gray', linestyle='--')

# Menetapkan label sumbu
ax.set_xlabel('X-axis')
ax.set_ylabel('Y-axis')
ax.set_zlabel('Z-axis')

# Menampilkan plot
plt.show()
