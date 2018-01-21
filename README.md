# Vanilla Vectors 3D

[![Build Status](https://travis-ci.org/thormeier/vanilla-vectors-3d.svg?branch=master)](https://travis-ci.org/thormeier/vanilla-vectors-3d)

A small library with vectors, lines and planes that allows for some simple vector geometry calculations. Written in plain vanilla JS, hence the name.

## Installation

    npm install --save vanilla-vectors-3d

## Usage (ES6)

Create a vector with `P(1/2/3)`:

    import Vector from 'vanilla-vectors-3d'
    
    const v = new Vector(1, 2, 3)
    
Do some calculations:

    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(4, 5, 6)
    
    // Subtract
    v1.minus(v2) // === Vector(-3, -3, -3)
    
    // Add
    v1.plus(v2) // === Vector(5, 7, 9)
    
    // Multiply with a scalar
    v1.timesScalar(3) // === Vector(3, 6, 9)
    
    // Cross product of two vectors
    v1.cross(v2) // === Vector(-3, 6, -3)
    
    // Scalar product of two vectors
    v1.scalarProduct(v2) // === -24
    
    // Length
    v1.length // === 3.741...
    
    // Transform vector to a length of 1
    v1.normalize() // === Vector(0.26..., 0.53..., 0.80...)
    
    // Rotate around an axis
    const v3 = new Vector(1, 0, 0)
    v3.rotate('y', 90) // === Vector(0, 0, -1)
    
    // Rotate around a line represented by its normal vector
    v3.rotateAroundVector(v1.normalize(), 90)
    
    // Rotate around Line object
    v3.rotateAroundLine(new Line(v1, v2), 90)
    
    // Check if one vector is a multiple of another
    v1.isLinearlyDependentOn(v2) // === false
    
    // Check if two vectors are equal
    v1.isEqualTo(v2)
    
    // Apply a transformation matrix
    v1.applyTransformationMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]) //  === v1

Also lines are given:

    const v1 = new Vector(1, 1, 1)
    const v2 = new Vector(2, 2, 2)
    
    const l = new Line(v1, v2)
    
    // Rotate line around two axes X and Z
    l.rotate(180, 180)
    
    // Rotate line around another line
    const v3 = new Vector(4, 5, 6)
    const v4 = new Vector(7, 8, 9)
    
    l.rotateAroundLine(new Line(v3, v4), 90)
    
As well as planes:

    const v1 = new Vector(0, 0, 0)
    const v2 = new Vector(1, 0, 0)
    const v3 = new Vector(0, 1, 0)
    
    const p = new Plane(v1, v2, v3)
    
    // Calculate an intersection vector with a given line
    const v4 = new Vector(1, 1, 1)
    const v5 = new Vector(1, 1, -1)
    const l = new Line(v4, v5)
    
    p.getIntersectionWith(l) // Vector if one point exists, null if Line is within Plane or parallel
