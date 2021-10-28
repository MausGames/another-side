////////////////////////////////////////////////////////
//*--------------------------------------------------*//
//| Part of Another Side (https://www.maus-games.at) |//
//*--------------------------------------------------*//
//| Released under the zlib License                  |//
//| More information available in the readme file    |//
//*--------------------------------------------------*//
////////////////////////////////////////////////////////
"use strict";
const RES = {};


// ****************************************************************
RES.cBlock = {};
RES.cBlock.s_afVertexData =
[-1.0, -1.0, -1.0,  0.0,  0.0, -1.00000,  0.00000,  0.00000,
 -1.0, -1.0,  1.0,  0.0,  0.0, -1.00000,  0.00000,  0.00000,
 -1.0,  1.0, -1.0,  0.0,  0.0, -1.00000,  0.00000,  0.00000,
 -1.0,  1.0,  1.0,  0.0,  0.0, -1.00000,  0.00000,  0.00000,
  1.0, -1.0, -1.0,  0.0,  0.0,  1.00000,  0.00000,  0.00000,
  1.0, -1.0,  1.0,  0.0,  0.0,  1.00000,  0.00000,  0.00000,
  1.0,  1.0, -1.0,  0.0,  0.0,  1.00000,  0.00000,  0.00000,
  1.0,  1.0,  1.0,  0.0,  0.0,  1.00000,  0.00000,  0.00000,
 -1.0, -1.0, -1.0,  0.0,  0.0,  0.00000, -1.00000,  0.00000,
 -1.0, -1.0,  1.0,  0.0,  0.0,  0.00000, -1.00000,  0.00000,
  1.0, -1.0, -1.0,  0.0,  0.0,  0.00000, -1.00000,  0.00000,
  1.0, -1.0,  1.0,  0.0,  0.0,  0.00000, -1.00000,  0.00000,
 -1.0,  1.0, -1.0,  0.0,  0.0,  0.00000,  1.00000,  0.00000,
 -1.0,  1.0,  1.0,  0.0,  0.0,  0.00000,  1.00000,  0.00000,
  1.0,  1.0, -1.0,  0.0,  0.0,  0.00000,  1.00000,  0.00000,
  1.0,  1.0,  1.0,  0.0,  0.0,  0.00000,  1.00000,  0.00000,
 -1.0, -1.0, -1.0,  0.0,  0.0,  0.00000,  0.00000, -1.00000,
 -1.0,  1.0, -1.0,  0.0,  0.0,  0.00000,  0.00000, -1.00000,
  1.0, -1.0, -1.0,  0.0,  0.0,  0.00000,  0.00000, -1.00000,
  1.0,  1.0, -1.0,  0.0,  0.0,  0.00000,  0.00000, -1.00000,
 -1.0, -1.0,  1.0,  0.0,  0.0,  0.00000,  0.00000,  1.00000,
 -1.0,  1.0,  1.0,  0.0,  0.0,  0.00000,  0.00000,  1.00000,
  1.0, -1.0,  1.0,  0.0,  0.0,  0.00000,  0.00000,  1.00000,
  1.0,  1.0,  1.0,  0.0,  0.0,  0.00000,  0.00000,  1.00000];

RES.cBlock.s_aiIndexData =
[0, 1, 2, 3, 2, 1, 4, 6, 5, 7, 5, 6, 8, 10, 9, 11, 9, 10, 12, 13, 14, 15, 14, 13, 16, 17, 18, 19, 18, 17, 20, 22, 21, 23, 21, 22];

RES.cBlock.s_sVertexShader =
"attribute vec3 a_v3Position;"                                      +
"uniform   mat4 u_m4ModelViewProj;"                                 +
"uniform   mat4 u_m4ModelView;"                                     +
"varying   vec3 v_v3Relative;"                                      +
"varying   vec3 v_v3Position;"                                      +
""                                                                  +
"void main()"                                                       +
"{"                                                                 +
"    v_v3Relative = (u_m4ModelView * vec4(a_v3Position, 1.0)).xyz;" +
"    v_v3Position = a_v3Position;"                                  +
""                                                                  +
"    gl_Position = u_m4ModelViewProj * vec4(a_v3Position, 1.0);"    +
"}";

RES.cBlock.s_sFragmentShader =
"precision mediump float;"                                                            +
""                                                                                    +
"uniform vec4 u_v4Color;"                                                             +
"varying vec3 v_v3Relative;"                                                          +
"varying vec3 v_v3Position;"                                                          +
""                                                                                    +
"void main()"                                                                         +
"{"                                                                                   +
"    const vec3 v3Camera = vec3(0.0, 0.0, -1.0);"                                     +
"    const vec3 v3Light  = vec3(0.0, 0.0,  1.0);"                                     +
""                                                                                    +
"    float v1Intensity  = 0.28 + 2.5 * inversesqrt(dot(v_v3Relative, v_v3Relative));" +
"          v1Intensity *= dot(normalize(v_v3Relative), v3Camera);"                    +
""                                                                                    +
"          v1Intensity  = min(v1Intensity, 1.0);"                                     +
"          v1Intensity *= 0.88 + 0.12 * dot(normalize(v_v3Position), v3Light);"       +
""                                                                                    +
"    gl_FragColor = vec4(u_v4Color.rgb*v1Intensity, u_v4Color.a);"                    +
"}";


// ****************************************************************
RES.cWorld = {};
RES.cWorld.s_sFragmentShader =
"precision mediump float;"                                                            +
""                                                                                    +
"uniform vec4 u_v4Color;"                                                             +
"varying vec3 v_v3Relative;"                                                          +
""                                                                                    +
"void main()"                                                                         +
"{"                                                                                   +
"    const vec3 v3Camera = vec3(0.0, 0.0, -1.0);"                                     +
""                                                                                    +
"    float v1Intensity  = 0.28 + 2.5 * inversesqrt(dot(v_v3Relative, v_v3Relative));" +
"          v1Intensity *= dot(normalize(v_v3Relative), v3Camera);"                    +
""                                                                                    +
"    gl_FragColor = vec4(u_v4Color.rgb*v1Intensity, u_v4Color.a);"                    +
"}";
