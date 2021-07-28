//////////////////////////////////////////////////////////////////////////////////
//*----------------------------------------------------------------------------*//
//| Another Side v1.0.0 (https://www.maus-games.at)                            |//
//*----------------------------------------------------------------------------*//
//| Copyright (c) 2021 Martin Mauersics                                        |//
//|                                                                            |//
//| This software is provided 'as-is', without any express or implied          |//
//| warranty. In no event will the authors be held liable for any damages      |//
//| arising from the use of this software.                                     |//
//|                                                                            |//
//| Permission is granted to anyone to use this software for any purpose,      |//
//| including commercial applications, and to alter it and redistribute it     |//
//| freely, subject to the following restrictions:                             |//
//|                                                                            |//
//| 1. The origin of this software must not be misrepresented; you must not    |//
//|    claim that you wrote the original software. If you use this software    |//
//|    in a product, an acknowledgment in the product documentation would be   |//
//|    appreciated but is not required.                                        |//
//|                                                                            |//
//| 2. Altered source versions must be plainly marked as such, and must not be |//
//|    misrepresented as being the original software.                          |//
//|                                                                            |//
//| 3. This notice may not be removed or altered from any source distribution. |//
//*----------------------------------------------------------------------------*//
//////////////////////////////////////////////////////////////////////////////////
"use strict";
const APP = {};


// ****************************************************************
APP.SETTINGS = {};
APP.SETTINGS.Alpha   = false;
APP.SETTINGS.Depth   = true;
APP.SETTINGS.Stencil = false;

const SIDES      = 6;
const BLOCK_LINE = 12;
const BLOCK_ALL  = BLOCK_LINE * BLOCK_LINE;

let g_pWorld   = null;
let g_aapBlock = new Array(SIDES);

let g_mSideTransform = mat4.create();
let g_avSideNormal   = new Array(SIDES);

let g_bDrag       = false;
let g_vCamDir     = vec3.create();
let g_vMousePrev  = vec2.create();
let g_vMouseForce = vec2.create();

let g_bFinished     = false;
let g_fFinishedTime = 0.0;

let g_pMenuThanks = null;


// ****************************************************************
APP.Init = function()
{
    cWorld.Init();
    cBlock.Init();

    g_pWorld = new cWorld();

    for(let i = 0; i < SIDES; ++i)
    {
        g_aapBlock[i] = new Array(BLOCK_ALL);

        for(let j = 0; j < BLOCK_ALL; ++j)
        {
            const iType = cLevel[i].aiValue[j];

            g_aapBlock[i][j] = new cBlock();
            g_aapBlock[i][j].m_vPosition[0] = -0.3 * (          (j % BLOCK_LINE) - 5.5);
            g_aapBlock[i][j].m_vPosition[1] =  0.3 * (Math.floor(j / BLOCK_LINE) - 5.5);

            if(iType)
            {
                g_aapBlock[i][j].SetType(iType);
                g_aapBlock[i][j].m_bActive = true;
            }
        }

        g_avSideNormal[i] = vec3.create();
    }

    g_pMenuThanks = document.getElementById("text-thanks");

    vec3.set(g_vCamDir, 0.0, 1.0, 0.0);

    vec3.set(WIND.g_vCamTarget,      0.0, 0.0, 0.0);
    vec3.set(WIND.g_vCamOrientation, 0.0, 0.0, 1.0);
};


// ****************************************************************
APP.Exit = function()
{
    cWorld.Exit();
    cBlock.Exit();
};


// ****************************************************************
APP.Render = function()
{
    g_pWorld.Render();

    for(let i = 0; i < SIDES; ++i)
    {
        EnableSideTransform(i);

        for(let j = 0; j < BLOCK_ALL; ++j)
        {
            g_aapBlock[i][j].Render();
        }
    }
};


// ****************************************************************
APP.Move = function()
{
    UTILS.SetElementOpacity(WIND.g_pMenuHeader, UTILS.LerpHermite3(0.0, 1.0, UTILS.Clamp(2.5 - 0.7 * WIND.g_fTotalTime, 0.0, 1.0)));

    if(g_bFinished)
    {
        g_fFinishedTime += 1.0 * WIND.g_fTime;

        const fRota = Math.min(g_fFinishedTime, 2.0) * 0.0008 * WIND.g_fTime;
        g_vMouseForce[0] += fRota;
        g_vMouseForce[1] += fRota;

        g_pWorld.m_vColor[3] = UTILS.LerpHermite3(0.0, 1.0, Math.max(1.0 - g_fFinishedTime * 0.15, 0.0));

        g_pMenuThanks.innerHTML = "<p>THANK YOU FOR PLAYING</p>";
        UTILS.SetElementOpacity(g_pMenuThanks, UTILS.LerpHermite3(0.0, 1.0, UTILS.Clamp(g_fFinishedTime * 0.7 - 5.0, 0.0, 1.0)));
    }
    else if(g_bDrag)
    {
        vec2.sub  (WIND.V, WIND.g_vMousePos, g_vMousePrev);
        vec2.scale(WIND.V, WIND.V,           0.1);

        vec2.add(g_vMouseForce, g_vMouseForce, WIND.V);
    }

    vec2.copy(g_vMousePrev, WIND.g_vMousePos);

    mat4.fromRotation (WIND.M, g_vMouseForce[0] * -10.0, WIND.g_vCamOrientation);   // rotation X
    vec3.transformMat4(g_vCamDir,              g_vCamDir,              WIND.M);
    vec3.transformMat4(WIND.g_vCamOrientation, WIND.g_vCamOrientation, WIND.M);

    vec3.normalize(WIND.V, vec3.cross(WIND.V, g_vCamDir, WIND.g_vCamOrientation));

    mat4.fromRotation (WIND.M, g_vMouseForce[1] * -10.0, WIND.V);                   // rotation Y
    vec3.transformMat4(g_vCamDir,              g_vCamDir,              WIND.M);
    vec3.transformMat4(WIND.g_vCamOrientation, WIND.g_vCamOrientation, WIND.M);

    const fBreak = 1.0 - WIND.g_fTime * ((!g_bFinished && g_bDrag) ? 10.0 : 1.0);
    vec2.scale(g_vMouseForce, g_vMouseForce, fBreak);

    const fDistance = 6.0 + Math.min(g_fFinishedTime, 10.0);
    vec3.scale(WIND.g_vCamPosition, g_vCamDir, -fDistance);

    g_pWorld.Move();

    g_bFinished = true;
    for(let i = 0; i < SIDES; ++i)
    {
        if(!cLevel[i].bDone)
        {
            cLevel[i].pFunction(g_aapBlock[i]);
            g_bFinished = false;
        }
        else
        {
            for(let j = 0; j < BLOCK_ALL; ++j)
            {
                g_aapBlock[i][j].m_fFadeMove += 1.0 * WIND.g_fTime;
            }
        }

        EnableSideTransform(i);

        for(let j = 0; j < BLOCK_ALL; ++j)
        {
            g_aapBlock[i][j].Move();
            g_aapBlock[i][j].m_bClicked = false;
        }

        vec4.set          (g_avSideNormal[i], 0.0, 0.0, 1.0, 0.0);
        vec4.transformMat4(g_avSideNormal[i], g_avSideNormal[i], g_mSideTransform);
        vec4.transformMat4(g_avSideNormal[i], g_avSideNormal[i], WIND.g_mCamera);
    }
};


// ****************************************************************
APP.MouseDown = function(iButton)
{
    if(iButton === 0)
    {
        const vRayDir = vec4.fromValues(WIND.g_vMousePos[0], -WIND.g_vMousePos[1], -0.82, 0.0);

        vec4.transformMat4(vRayDir, vRayDir, mat4.invert(WIND.M, WIND.g_mCamera));
        vec3.normalize    (vRayDir, vRayDir);

        for(let i = 0; i < SIDES; ++i)
        {
            if(g_avSideNormal[i][2] < 0.5) continue;

            for(let j = 0; j < BLOCK_ALL; ++j)
            {
                const pBlock = g_aapBlock[i][j];

                if(pBlock.m_bActive && CheckCollision(pBlock, WIND.g_vCamPosition, vRayDir))
                {
                    pBlock.m_bClicked = true;
                    break;
                }
            }
        }
    }

    if(iButton >= 1)
    {
        g_bDrag = true;
    }
};


// ****************************************************************
APP.MouseUp = function(iButton)
{
    if(iButton >= 1)
    {
        g_bDrag = false;
    }
};


// ****************************************************************
APP.KeyDown = function(iKey)
{
    if(iKey === UTILS.KEY.M)
    {
        for(let i = 0; i < SIDES; ++i)
        {
            cLevel[i].bDone = true;
        }
    }
};


// ****************************************************************
APP.KeyUp = function(iKey)
{

};


// ****************************************************************
APP.StartGame = function()
{

};


// ****************************************************************
APP.PauseGame = function(bStatus)
{

};


// ****************************************************************
APP.ChangeOptionQuality = function(bStatus)
{

};


// ****************************************************************
APP.ChangeOptionMusic = function(bStatus)
{

};


// ****************************************************************
APP.ChangeOptionSound = function(bStatus)
{

};


// ****************************************************************
APP.Resize = function(sWidth, sMargin)
{
    g_pMenuThanks.style.width      = sWidth;
    g_pMenuThanks.style.marginLeft = sMargin;
};


// ****************************************************************
function EnableSideTransform(iSide)
{
    const fSize = g_pWorld.m_vSize[0] + g_aapBlock[0][0].m_vSize[0] + 0.002;

    switch(iSide)
    {
    default: console.assert(false);
    case 0: mat4.set(g_mSideTransform,  0.0,  0.0,  1.0,  0.0, /**/  0.0, -1.0,  0.0,  0.0, /**/  1.0,  0.0,  0.0,  0.0, /**/  fSize,    0.0,    0.0,  1.0); break;
    case 1: mat4.set(g_mSideTransform,  0.0,  0.0, -1.0,  0.0, /**/  0.0, -1.0,  0.0,  0.0, /**/ -1.0,  0.0,  0.0,  0.0, /**/ -fSize,    0.0,    0.0,  1.0); break;
    case 2: mat4.set(g_mSideTransform, -1.0,  0.0,  0.0,  0.0, /**/  0.0,  0.0,  1.0,  0.0, /**/  0.0,  1.0,  0.0,  0.0, /**/    0.0,  fSize,    0.0,  1.0); break;
    case 3: mat4.set(g_mSideTransform, -1.0,  0.0,  0.0,  0.0, /**/  0.0,  0.0, -1.0,  0.0, /**/  0.0, -1.0,  0.0,  0.0, /**/    0.0, -fSize,    0.0,  1.0); break;
    case 4: mat4.set(g_mSideTransform,  1.0,  0.0,  0.0,  0.0, /**/  0.0,  1.0,  0.0,  0.0, /**/  0.0,  0.0,  1.0,  0.0, /**/    0.0,    0.0,  fSize,  1.0); break;
    case 5: mat4.set(g_mSideTransform,  1.0,  0.0,  0.0,  0.0, /**/  0.0, -1.0,  0.0,  0.0, /**/  0.0,  0.0, -1.0,  0.0, /**/    0.0,    0.0, -fSize,  1.0); break;
    }
}


// ****************************************************************
function CheckCollision(pBlock, vRayPos, vRayDir)
{
    // calculate difference between ray and object
    mat4.getTranslation(WIND.V, pBlock.m_mTransform);
    vec3.sub(WIND.V, WIND.V, vRayPos);

    // get closest point on ray
    const fAdjacent = vec3.dot(WIND.V, vRayDir);
    const fDiffSq   = vec3.sqrLen(WIND.V);
    const fRadiusSq = vec3.dot(pBlock.m_vSize, pBlock.m_vSize);

    // check if ray moves away from object
    if((fAdjacent < 0.0) && (fDiffSq > fRadiusSq))
        return false;

    // get minimum distance
    const fOppositeSq = fDiffSq - UTILS.Pow2(fAdjacent);

    // check for sphere intersection
    if(fOppositeSq > fRadiusSq)
        return false;

    return true;
}