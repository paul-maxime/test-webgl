'use strict';

class SpriteBatch {
	constructor(gl, capacity) {
		this.gl = gl;
		this.capacity = capacity;
		this.vertexArray = new Float32Array(capacity * 6 * (3 + 4 + 2));
		this.positionOffset = 0;
		this.colorOffset = this.capacity * 6 * 3;
		this.textureOffset = this.capacity * 6 * (3 + 4);
		this.index = 0;
	}
	reset() {
		this.index = 0;
	}
	append(sprite) {
		if (sprite.areVerticesDirty) {
			sprite.updateVertices();
		}
		this.texture = sprite.texture;
		let i = this.positionOffset + this.index * 6 * 3;
		
		this.vertexArray[i++] = sprite.vertices[0][0];
		this.vertexArray[i++] = sprite.vertices[0][1];
		this.vertexArray[i++] = 0;
		
		this.vertexArray[i++] = sprite.vertices[1][0];
		this.vertexArray[i++] = sprite.vertices[1][1];
		this.vertexArray[i++] = 0;
		
		this.vertexArray[i++] = sprite.vertices[2][0];
		this.vertexArray[i++] = sprite.vertices[2][1];
		this.vertexArray[i++] = 0;
		
		this.vertexArray[i++] = sprite.vertices[2][0];
		this.vertexArray[i++] = sprite.vertices[2][1];
		this.vertexArray[i++] = 0;
		
		this.vertexArray[i++] = sprite.vertices[3][0];
		this.vertexArray[i++] = sprite.vertices[3][1];
		this.vertexArray[i++] = 0;
		
		this.vertexArray[i++] = sprite.vertices[1][0];
		this.vertexArray[i++] = sprite.vertices[1][1];
		this.vertexArray[i] = 0;
		
		i = this.colorOffset + this.index * 6 * 4;
		
		this.vertexArray[i++] = sprite.color[0];
		this.vertexArray[i++] = sprite.color[1];
		this.vertexArray[i++] = sprite.color[2];
		this.vertexArray[i++] = sprite.color[3];
		
		this.vertexArray[i++] = sprite.color[0];
		this.vertexArray[i++] = sprite.color[1];
		this.vertexArray[i++] = sprite.color[2];
		this.vertexArray[i++] = sprite.color[3];
		
		this.vertexArray[i++] = sprite.color[0];
		this.vertexArray[i++] = sprite.color[1];
		this.vertexArray[i++] = sprite.color[2];
		this.vertexArray[i++] = sprite.color[3];
		
		this.vertexArray[i++] = sprite.color[0];
		this.vertexArray[i++] = sprite.color[1];
		this.vertexArray[i++] = sprite.color[2];
		this.vertexArray[i++] = sprite.color[3];
		
		this.vertexArray[i++] = sprite.color[0];
		this.vertexArray[i++] = sprite.color[1];
		this.vertexArray[i++] = sprite.color[2];
		this.vertexArray[i++] = sprite.color[3];
		
		this.vertexArray[i++] = sprite.color[0];
		this.vertexArray[i++] = sprite.color[1];
		this.vertexArray[i++] = sprite.color[2];
		this.vertexArray[i] = sprite.color[3];
		
		i = this.textureOffset + this.index * 6 * 2;
		
		this.vertexArray[i++] = sprite.textureStartX;
		this.vertexArray[i++] = sprite.textureStartY;
		
		this.vertexArray[i++] = sprite.textureStartX;
		this.vertexArray[i++] = sprite.textureEndY;
		
		this.vertexArray[i++] = sprite.textureEndX;
		this.vertexArray[i++] = sprite.textureStartY;
		
		this.vertexArray[i++] = sprite.textureEndX;
		this.vertexArray[i++] = sprite.textureStartY;
		
		this.vertexArray[i++] = sprite.textureEndX;
		this.vertexArray[i++] = sprite.textureEndY;
		
		this.vertexArray[i++] = sprite.textureStartX;
		this.vertexArray[i] = sprite.textureEndY;
		
		this.index++;
	}
	draw(graphics) {
		graphics.bindTexture(this.texture);
		
		graphics.vertexPositionBuffer.setFloat32Array(this.vertexArray);
		this.gl.vertexAttribPointer(graphics.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, this.positionOffset * 4);
		this.gl.vertexAttribPointer(graphics.vertexColorAttribute, 4, this.gl.FLOAT, false, 0, this.colorOffset * 4);
		this.gl.vertexAttribPointer(graphics.textureCoordinatesAttribute, 2, this.gl.FLOAT, false, 0, this.textureOffset * 4);
		
		this.gl.uniformMatrix4fv(graphics.modelViewProjectionMatrixUniform, false, graphics.camera.viewProjectionMatrix);
		
		graphics.gl.drawArrays(this.gl.TRIANGLES, 0, 6 * this.index);
	}
}
