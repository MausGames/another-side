/////////////////////////////////////////////////////
//*-----------------------------------------------*//
//| Part of Throw Out (https://www.maus-games.at) |//
//*-----------------------------------------------*//
//| Copyright (c) 2014 Martin Mauersics           |//
//| Released under the zlib License               |//
//*-----------------------------------------------*//
/////////////////////////////////////////////////////
"use strict";
class cBackground extends windObject {


// ****************************************************************
static Init()
{
    cBackground.s_pModel  = new windModel ().Create(RES.cBackground.s_afVertexData,  RES.cBackground.s_aiIndexData);
    cBackground.s_pShader = new windShader().Create(RES.cBackground.s_sVertexShader, RES.cBackground.s_sFragmentShader);
}


// ****************************************************************
static Exit()
{
    cBackground.s_pModel .Destructor();
    cBackground.s_pShader.Destructor();
}


// ****************************************************************
constructor()
{
    super();

    this.m_pModel  = cBackground.s_pModel;
    this.m_pShader = cBackground.s_pShader;
}


// ****************************************************************
Render()
{
    GL.disable(GL.DEPTH_TEST);
    super.Render();
    GL.enable(GL.DEPTH_TEST);
}


} // class cBackground