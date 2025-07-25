/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable no-restricted-syntax, no-invalid-this */

'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils-define-nonenumerable-read-only-property' );
var inherits = require( '@stdlib/utils-inherit' );
var stride2offset = require( '@stdlib/strided-base-stride2offset' );
var readDataView = require( '@stdlib/strided-base-read-dataview' ).ndarray;
var Memory = require( '@stdlib/wasm-memory' );
var arrays2ptrs = require( '@stdlib/wasm-base-arrays2ptrs' );
var strided2object = require( '@stdlib/wasm-base-strided2object' );
var Module = require( './module.js' );


// MAIN //

/**
* Routine constructor.
*
* @private
* @constructor
* @returns {Routine} routine instance
*
* @example
* var Float32Array = require( '@stdlib/array-float32' );
*
* // Create a new routine:
* var sscal = new Routine();
*
* // Initialize the module:
* sscal.initializeSync();
*
* // Define a strided array:
* var x = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
*
* // Perform operation:
* sscal.main( x.length, 5.0, x, 1 );
* // x => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
*
* @example
* var Float32Array = require( '@stdlib/array-float32' );
*
* // Create a new routine:
* var sscal = new Routine();
*
* // Initialize the module:
* sscal.initializeSync();
*
* // Define a strided array:
* var x = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
*
* // Perform operation:
* sscal.ndarray( x.length, 5.0, x, 1, 0 );
* // x => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
*/
function Routine() {
	if ( !( this instanceof Routine ) ) {
		return new Routine();
	}
	Module.call( this, new Memory({
		'initial': 0
	}));
	return this;
}

// Inherit from the parent constructor:
inherits( Routine, Module );

/**
* Multiplies a vector `x` by a constant `alpha`.
*
* @name main
* @memberof Routine.prototype
* @readonly
* @type {Function}
* @param {PositiveInteger} N - number of indexed elements
* @param {number} alpha - scalar
* @param {Float32Array} x - input array
* @param {integer} strideX - `x` stride length
* @returns {Float32Array} input array
*
* @example
* var Float32Array = require( '@stdlib/array-float32' );
*
* // Create a new routine:
* var sscal = new Routine();
*
* // Initialize the module:
* sscal.initializeSync();
*
* // Define a strided array:
* var x = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
*
* // Perform operation:
* sscal.main( x.length, 5.0, x, 1 );
* // x => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
*/
setReadOnly( Routine.prototype, 'main', function sscal( N, alpha, x, strideX ) {
	return this.ndarray( N, alpha, x, strideX, stride2offset( N, strideX ) );
});

/**
* Multiplies a vector `x` by a constant `alpha` using alternative indexing semantics.
*
* @name ndarray
* @memberof Routine.prototype
* @readonly
* @type {Function}
* @param {PositiveInteger} N - number of indexed elements
* @param {number} alpha - scalar
* @param {Float32Array} x - input array
* @param {integer} strideX - `x` stride length
* @param {NonNegativeInteger} offsetX - starting index for `x`
* @returns {Float32Array} input array
*
* @example
* var Float32Array = require( '@stdlib/array-float32' );
*
* // Create a new routine:
* var sscal = new Routine();
*
* // Initialize the module:
* sscal.initializeSync();
*
* // Define a strided array:
* var x = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
*
* // Perform operation:
* sscal.ndarray( x.length, 5.0, x, 1, 0 );
* // x => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
*/
setReadOnly( Routine.prototype, 'ndarray', function sscal( N, alpha, x, strideX, offsetX ) {
	var ptrs;
	var p0;

	// Convert the input array to a "pointer" in the module's memory:
	ptrs = arrays2ptrs( this, [
		strided2object( N, x, strideX, offsetX )
	]);
	p0 = ptrs[0];

	// Perform computation by calling the corresponding parent method:
	Module.prototype.ndarray.call( this, N, alpha, p0.ptr, p0.stride, p0.offset ); // eslint-disable-line max-len

	// If the input array data had to be copied to module memory, copy the results to the provided input array...
	if ( p0.copy ) {
		readDataView( N, this.view, p0.stride*p0.BYTES_PER_ELEMENT, p0.ptr, x, strideX, offsetX, true ); // eslint-disable-line max-len
	}
	return x;
});


// EXPORTS //

module.exports = Routine;
