////////////////////////////////////////////////////////
//*--------------------------------------------------*//
//| Part of Another Side (https://www.maus-games.at) |//
//*--------------------------------------------------*//
//| Released under the zlib License                  |//
//| More information available in the readme file    |//
//*--------------------------------------------------*//
////////////////////////////////////////////////////////
"use strict";
class cBlock extends windObject {


// ****************************************************************
static Init()
{
    cBlock.s_pModel  = new windModel ().Create(RES.cBlock.s_afVertexData,  RES.cBlock.s_aiIndexData);
    cBlock.s_pShader = new windShader().Create(RES.cBlock.s_sVertexShader, RES.cBlock.s_sFragmentShader);
}


// ****************************************************************
static Exit()
{
    cBlock.s_pModel .Destructor();
    cBlock.s_pShader.Destructor();
}


// ****************************************************************
constructor()
{
    super();

    this.m_pModel    = cBlock.s_pModel;
    this.m_pShader   = cBlock.s_pShader;

    this.m_bActive   = false;
    this.m_bClicked  = false;
    this.m_iType     = 0;

    this.m_fFade     = 0.0;
    this.m_fFadeMove = 0.0;
}


// ****************************************************************
Render()
{
    if(this.m_bActive)
    {
        super.Render();
    }
}


// ****************************************************************
Move()
{
    if(this.m_bActive)
    {
        this.m_fFade   += Math.max(this.m_fFadeMove - 0.7 * (vec2.len(this.m_vPosition) - 0.2) - 0.8 * (0.5 + 0.5 * Math.sin(18.0 * (this.m_vPosition[0] + 2.0 * this.m_vPosition[1]))), 0.0) * WIND.g_fTime * 0.5;
        const fRealFade = UTILS.LerpHermite3(0.0, 1.001, Math.min(this.m_fFade, 1.0));

        this.m_vPosition[2] = 60.0 * fRealFade;
        this.m_vColor[3]    = 1.0 - 1.0 * fRealFade;

        if(this.m_vColor[3] <= 0.0) this.m_bActive = false;

        mat4.copy     (this.m_mTransform, g_mSideTransform);
        mat4.translate(this.m_mTransform, this.m_mTransform, this.m_vPosition);
        mat4.scale    (this.m_mTransform, this.m_mTransform, this.m_vSize);
    }
}


// ****************************************************************
SetColor(iType)
{
    switch(iType)
    {
    default: console.assert(false);
    case 0: vec4.set(this.m_vColor, 0.96, 0.96, 0.96, 1.0); break;
    case 1: vec4.set(this.m_vColor, 0.3,  0.9,  0.98, 1.0); break;
    case 2: vec4.set(this.m_vColor, 0.3,  0.3,  0.3,  1.0); break;
    }
}


// ****************************************************************
SetType(iType)
{
    if(iType !== 0)
    {
        if(this.m_iType === 0)
        {
            vec3.set(this.m_vSize, 0.1, 0.1, 0.1);

            if(iType > 3)
            {
                this.m_vPosition[0] -= 0.15;
                this.m_vPosition[1] += 0.15;
                this.m_vSize[0]     *= 2.5;
                this.m_vSize[1]     *= 2.5;
            }
        }

        this.SetColor((iType - 1) % 3);
    }

    this.m_iType = iType;
}


} // class cBlock