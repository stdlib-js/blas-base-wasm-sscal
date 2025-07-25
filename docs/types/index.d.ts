/*
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

// TypeScript Version: 4.1

/// <reference types="@stdlib/types"/>

import { ModuleWrapper, Memory } from '@stdlib/types/wasm';

/**
* Interface defining a module constructor which is both "newable" and "callable".
*/
interface ModuleConstructor {
	/**
	* Returns a new WebAssembly module wrapper instance which uses the provided WebAssembly memory instance as its underlying memory.
	*
	* @param mem - WebAssembly memory instance
	* @returns module wrapper instance
	*
	* @example
	* var Memory = require( '@stdlib/wasm-memory' );
	* var oneTo = require( '@stdlib/array-one-to' );
	* var ones = require( '@stdlib/array-ones' );
	* var zeros = require( '@stdlib/array-zeros' );
	* var bytesPerElement = require( '@stdlib/ndarray-base-bytes-per-element' );
	*
	* // Create a new memory instance with an initial size of 10 pages (640KiB) and a maximum size of 100 pages (6.4MiB):
	* var mem = new Memory({
	*     'initial': 10,
	*     'maximum': 100
	* });
	*
	* // Create a BLAS routine:
	* var mod = new sscal.Module( mem );
	* // returns <Module>
	*
	* // Initialize the routine:
	* mod.initializeSync();
	*
	* // Define a vector data type:
	* var dtype = 'float32';
	*
	* // Specify a vector length:
	* var N = 5;
	*
	* // Define a pointer (i.e., byte offset) for storing an input vector:
	* var xptr = 0;
	*
	* // Write vector values to module memory:
	* mod.write( xptr, oneTo( N, dtype ) );
	*
	* // Perform computation:
	* var ptr = mod.main( N, 5.0, xptr, 1 );
	* // returns <number>
	*
	* var bool = ( ptr === xptr );
	* // returns true
	*
	* // Read out the results:
	* var view = zeros( N, dtype );
	* mod.read( xptr, view );
	* // view => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
	*/
	new( mem: Memory ): Module; // newable

	/**
	* Returns a new WebAssembly module wrapper instance which uses the provided WebAssembly memory instance as its underlying memory.
	*
	* @param mem - WebAssembly memory instance
	* @returns module wrapper instance
	*
	* @example
	* var Memory = require( '@stdlib/wasm-memory' );
	* var oneTo = require( '@stdlib/array-one-to' );
	* var ones = require( '@stdlib/array-ones' );
	* var zeros = require( '@stdlib/array-zeros' );
	* var bytesPerElement = require( '@stdlib/ndarray-base-bytes-per-element' );
	*
	* // Create a new memory instance with an initial size of 10 pages (640KiB) and a maximum size of 100 pages (6.4MiB):
	* var mem = new Memory({
	*     'initial': 10,
	*     'maximum': 100
	* });
	*
	* // Create a BLAS routine:
	* var mod = sscal.Module( mem );
	* // returns <Module>
	*
	* // Initialize the routine:
	* mod.initializeSync();
	*
	* // Define a vector data type:
	* var dtype = 'float32';
	*
	* // Specify a vector length:
	* var N = 5;
	*
	* // Define a pointer (i.e., byte offset) for storing an input vector:
	* var xptr = 0;
	*
	* // Write vector values to module memory:
	* mod.write( xptr, oneTo( N, dtype ) );
	*
	* // Perform computation:
	* var ptr = mod.main( N, 5.0, xptr, 1 );
	* // returns <number>
	*
	* var bool = ( ptr === xptr );
	* // returns true
	*
	* // Read out the results:
	* var view = zeros( N, dtype );
	* mod.read( xptr, view );
	* // view => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
	*/
	( mem: Memory ): Module; // callable
}

/**
* Interface describing a `sscal` WebAssembly module.
*/
interface Module extends ModuleWrapper {
	/**
	* Multiplies a vector `x` by a constant `alpha`.
	*
	* @param N - number of indexed elements
	* @param alpha - constant
	* @param xptr - input array pointer (i.e., byte offset)
	* @param strideX - `x` stride length
	* @returns input array pointer (i.e., byte offset)
	*
	* @example
	* var Memory = require( '@stdlib/wasm-memory' );
	* var oneTo = require( '@stdlib/array-one-to' );
	* var ones = require( '@stdlib/array-ones' );
	* var zeros = require( '@stdlib/array-zeros' );
	* var bytesPerElement = require( '@stdlib/ndarray-base-bytes-per-element' );
	*
	* // Create a new memory instance with an initial size of 10 pages (640KiB) and a maximum size of 100 pages (6.4MiB):
	* var mem = new Memory({
	*     'initial': 10,
	*     'maximum': 100
	* });
	*
	* // Create a BLAS routine:
	* var mod = new sscal.Module( mem );
	* // returns <Module>
	*
	* // Initialize the routine:
	* mod.initializeSync();
	*
	* // Define a vector data type:
	* var dtype = 'float32';
	*
	* // Specify a vector length:
	* var N = 5;
	*
	* // Define a pointer (i.e., byte offset) for storing an input vector:
	* var xptr = 0;
	*
	* // Write vector values to module memory:
	* mod.write( xptr, oneTo( N, dtype ) );
	*
	* // Perform computation:
	* var ptr = mod.main( N, 5.0, xptr, 1 );
	* // returns <number>
	*
	* var bool = ( ptr === xptr );
	* // returns true
	*
	* // Read out the results:
	* var view = zeros( N, dtype );
	* mod.read( xptr, view );
	* // view => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
	*/
	main( N: number, alpha: number, xptr: number, strideX: number ): number;

	/**
	* Multiplies a vector `x` by a constant `alpha` using alternative indexing semantics.
	*
	* @param N - number of indexed elements
	* @param alpha - constant
	* @param xptr - input array pointer (i.e., byte offset)
	* @param strideX - `x` stride length
	* @param offsetX - starting index for `x`
	* @returns input array pointer (i.e., byte offset)
	*
	* @example
	* var Memory = require( '@stdlib/wasm-memory' );
	* var oneTo = require( '@stdlib/array-one-to' );
	* var ones = require( '@stdlib/array-ones' );
	* var zeros = require( '@stdlib/array-zeros' );
	* var bytesPerElement = require( '@stdlib/ndarray-base-bytes-per-element' );
	*
	* // Create a new memory instance with an initial size of 10 pages (640KiB) and a maximum size of 100 pages (6.4MiB):
	* var mem = new Memory({
	*     'initial': 10,
	*     'maximum': 100
	* });
	*
	* // Create a BLAS routine:
	* var mod = new sscal.Module( mem );
	* // returns <Module>
	*
	* // Initialize the routine:
	* mod.initializeSync();
	*
	* // Define a vector data type:
	* var dtype = 'float32';
	*
	* // Specify a vector length:
	* var N = 5;
	*
	* // Define a pointer (i.e., byte offset) for storing an input vector:
	* var xptr = 0;
	*
	* // Write vector values to module memory:
	* mod.write( xptr, oneTo( N, dtype ) );
	*
	* // Perform computation:
	* var ptr = mod.ndarray( N, 5.0, xptr, 1, 0 );
	* // returns <number>
	*
	* var bool = ( ptr === xptr );
	* // returns true
	*
	* // Read out the results:
	* var view = zeros( N, dtype );
	* mod.read( xptr, view );
	* // view => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
	*/
	ndarray( N: number, alpha: number, xptr: number, strideX: number, offsetX: number ): number;
}

/**
* Interface describing `sscal`.
*/
interface Routine extends ModuleWrapper {
	/**
	* Multiplies a vector `x` by a constant `alpha`.
	*
	* @param N - number of indexed elements
	* @param alpha - constant
	* @param x - input array
	* @param strideX - `x` stride length
	* @returns input array
	*
	* @example
	* var Float32Array = require( '@stdlib/array-float32' );
	*
	* var x = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	*
	* sscal.main( x.length, 5.0, x, 1 );
	* // x => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
	*/
	main( N: number, alpha: number, x: Float32Array, strideX: number ): Float32Array;

	/**
	* Multiplies a vector `x` by a constant `alpha` using alternative indexing semantics.
	*
	* @param N - number of indexed elements
	* @param alpha - constant
	* @param x - input array
	* @param strideX - `x` stride length
	* @param offsetX - starting index for `x`
	* @returns input array
	*
	* @example
	* var Float32Array = require( '@stdlib/array-float32' );
	*
	* var x = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	*
	* sscal.ndarray( x.length, 5.0, x, 1, 0 );
	* // x => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
	*/
	ndarray( N: number, alpha: number, x: Float32Array, strideX: number, offsetX: number ): Float32Array;

	/**
	* Returns a new WebAssembly module wrapper instance which uses the provided WebAssembly memory instance as its underlying memory.
	*
	* @param mem - WebAssembly memory instance
	* @returns module wrapper instance
	*
	* @example
	* var Memory = require( '@stdlib/wasm-memory' );
	* var oneTo = require( '@stdlib/array-one-to' );
	* var ones = require( '@stdlib/array-ones' );
	* var zeros = require( '@stdlib/array-zeros' );
	* var bytesPerElement = require( '@stdlib/ndarray-base-bytes-per-element' );
	*
	* // Create a new memory instance with an initial size of 10 pages (640KiB) and a maximum size of 100 pages (6.4MiB):
	* var mem = new Memory({
	*     'initial': 10,
	*     'maximum': 100
	* });
	*
	* // Create a BLAS routine:
	* var mod = new sscal.Module( mem );
	* // returns <Module>
	*
	* // Initialize the routine:
	* mod.initializeSync();
	*
	* // Define a vector data type:
	* var dtype = 'float32';
	*
	* // Specify a vector length:
	* var N = 5;
	*
	* // Define a pointer (i.e., byte offset) for storing an input vector:
	* var xptr = 0;
	*
	* // Write vector values to module memory:
	* mod.write( xptr, oneTo( N, dtype ) );
	*
	* // Perform computation:
	* var ptr = mod.main( N, 5.0, xptr, 1 );
	* // returns <number>
	*
	* var bool = ( ptr === xptr );
	* // returns true
	*
	* // Read out the results:
	* var view = zeros( N, dtype );
	* mod.read( xptr, view );
	* // view => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
	*/
	Module: ModuleConstructor;
}

/**
* Multiplies a vector `x` by a constant `alpha`.
*
* @param N - number of indexed elements
* @param alpha - constant
* @param x - input array
* @param strideX - `x` stride length
* @returns input array
*
* @example
* var Float32Array = require( '@stdlib/array-float32' );
*
* var x = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
*
* sscal.main( x.length, 5.0, x, 1 );
* // x => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
*
* @example
* var Float32Array = require( '@stdlib/array-float32' );
*
* var x = new Float32Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
*
* sscal.ndarray( x.length, 5.0, x, 1, 0 );
* // x => <Float32Array>[ 5.0, 10.0, 15.0, 20.0, 25.0 ]
*/
declare var sscal: Routine;


// EXPORTS //

export = sscal;
